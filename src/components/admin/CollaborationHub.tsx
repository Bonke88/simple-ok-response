
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { MessageSquare, Send, CheckCircle, Clock, Users } from 'lucide-react';

interface ContentComment {
  id: string;
  content_id: string;
  content_type: string;
  parent_id?: string;
  author_id: string;
  content: string;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    email: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  replies?: ContentComment[];
}

interface CollaborationHubProps {
  contentId: string;
  contentType: 'article' | 'tool';
}

export const CollaborationHub: React.FC<CollaborationHubProps> = ({
  contentId,
  contentType
}) => {
  const [comments, setComments] = useState<ContentComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contentId) {
      fetchComments();
      setupRealtimeSubscription();
    }
  }, [contentId, contentType]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content_comments')
        .select(`
          *,
          profiles:author_id (
            email,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('content_id', contentId)
        .eq('content_type', contentType)
        .is('parent_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch replies for each comment
      const commentsWithReplies = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: replies, error: repliesError } = await supabase
            .from('content_comments')
            .select(`
              *,
              profiles:author_id (
                email,
                first_name,
                last_name,
                avatar_url
              )
            `)
            .eq('parent_id', comment.id)
            .order('created_at', { ascending: true });

          if (repliesError) throw repliesError;

          return {
            ...comment,
            replies: replies || []
          };
        })
      );

      setComments(commentsWithReplies);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch comments',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('content_comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'content_comments',
          filter: `content_id=eq.${contentId}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const addComment = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('content_comments')
        .insert({
          content_id: contentId,
          content_type: contentType,
          author_id: user.id,
          content: newComment
        });

      if (error) throw error;

      setNewComment('');
      toast({
        title: 'Success',
        description: 'Comment added successfully'
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive'
      });
    }
  };

  const addReply = async (parentId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('content_comments')
        .insert({
          content_id: contentId,
          content_type: contentType,
          parent_id: parentId,
          author_id: user.id,
          content: replyContent
        });

      if (error) throw error;

      setReplyContent('');
      setReplyingTo(null);
      toast({
        title: 'Success',
        description: 'Reply added successfully'
      });
    } catch (error) {
      console.error('Error adding reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to add reply',
        variant: 'destructive'
      });
    }
  };

  const resolveComment = async (commentId: string, isResolved: boolean) => {
    try {
      const { error } = await supabase
        .from('content_comments')
        .update({ is_resolved: !isResolved })
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Comment ${!isResolved ? 'resolved' : 'reopened'}`
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to update comment',
        variant: 'destructive'
      });
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Collaboration Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Comment */}
        <div className="space-y-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment or feedback..."
            rows={3}
          />
          <Button onClick={addComment} disabled={!newComment.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Add Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-4">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No comments yet. Be the first to add feedback!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4 space-y-3">
                {/* Comment Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.profiles?.avatar_url} />
                      <AvatarFallback>
                        {getInitials(comment.profiles?.first_name, comment.profiles?.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {comment.profiles?.first_name} {comment.profiles?.last_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={comment.is_resolved ? "default" : "secondary"}>
                      {comment.is_resolved ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolved
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Open
                        </>
                      )}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => resolveComment(comment.id, comment.is_resolved)}
                    >
                      {comment.is_resolved ? 'Reopen' : 'Resolve'}
                    </Button>
                  </div>
                </div>

                {/* Comment Content */}
                <div className="pl-11">
                  <p className="text-gray-700">{comment.content}</p>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-11 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={reply.profiles?.avatar_url} />
                            <AvatarFallback className="text-xs">
                              {getInitials(reply.profiles?.first_name, reply.profiles?.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">
                                {reply.profiles?.first_name} {reply.profiles?.last_name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(reply.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <div className="pl-11">
                  {replyingTo === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => addReply(comment.id)}>
                          Reply
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
