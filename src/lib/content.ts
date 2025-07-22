export interface Article {
  slug: string;
  title: string;
  description: string;
  category: 'picking-winners' | 'ship-it' | 'first-customers' | 'scale';
  readTime: string;
  difficulty: 'Beginner friendly' | 'Tactical' | 'Advanced tactics' | 'Uncomfortable but necessary';
  publishedDate: string;
  tags: string[];
  content: string;
  relatedArticles?: string[];
}

// Sample articles data - In production, this would load from markdown files
export const articlesData: Article[] = [
  // Picking Winners Category
  {
    slug: 'fatal-flaw-why-99-percent-side-projects-make-zero',
    title: 'The Fatal Flaw: Why 99% of Side Projects Make $0',
    description: 'Most engineers build cool tech that nobody wants to pay for. Here\'s the uncomfortable truth about why your side project will probably fail.',
    category: 'picking-winners',
    readTime: '8 min',
    difficulty: 'Uncomfortable but necessary',
    publishedDate: '2024-01-15',
    tags: ['market-validation', 'side-projects', 'mistakes'],
    content: `# The Fatal Flaw: Why 99% of Side Projects Make $0

You've been there. 2am, kids asleep, laptop glowing. You're building something that's going to change everything. The code is clean, the architecture is beautiful, and you're solving a real problem.

Six months later, you have 12 users and $0 in revenue.

## The Problem Isn't Technical

As a corporate engineer making $200K+, you know how to build things. The problem isn't your code, your infrastructure choices, or your deployment strategy.

The problem is simpler and more brutal: **You built something nobody wants to pay for.**

## The Fatal Flaw: Building vs. Selling

Here's what happens to 99% of engineer side projects:

1. **Month 1-2:** You identify a problem you have
2. **Month 3-6:** You build an elegant solution 
3. **Month 7:** You launch to crickets
4. **Month 8:** You pivot to a different problem
5. **Month 9:** You abandon the project

The fatal flaw isn't in any of these steps. It's in what you *didn't* do: **You never validated that other people would pay to solve this problem.**

## Why Engineers Make This Mistake

### 1. We Solve Our Own Problems
As engineers, we're problem-solvers. We see inefficiencies everywhere and our first instinct is to code a solution. But your problems aren't necessarily profitable problems.

**Example:** You built a tool to automatically organize your Slack channels. It's brilliant! But you're the only person who organizes Slack channels obsessively. Everyone else just lives with the chaos.

### 2. We Confuse Technical Complexity with Market Value
The harder something is to build, the more valuable it feels. But the market doesn't care about your technical wizardry.

**Reality Check:** Simple solutions to painful problems beat complex solutions to mild annoyances every time.

### 3. We Underestimate Sales and Marketing
"If I build it, they will come" is the engineer's biggest lie. You assume that good products sell themselves because you've never had to sell anything at your day job.

## The $10K Question

Before you write a single line of code, ask yourself: **"Do people currently spend money trying to solve this problem?"**

If the answer is no, you're building a hobby, not a business.

If the answer is yes, ask: **"Are they spending enough money that they'd pay me $10K/year to solve it better?"**

## What Successful Side Projects Do Differently

The engineers who build profitable side projects don't start with code. They start with customers.

### 1. They Talk to People First
Before building anything, they have 20+ conversations with potential customers. They ask:
- "How do you currently solve this problem?"
- "How much does the current solution cost you?"
- "What would you pay for a better solution?"

### 2. They Pre-Sell Before They Build
They create landing pages, get email signups, and ask for pre-orders. If they can't get 100 people interested enough to give them an email address, they don't build it.

### 3. They Focus on Business Value, Not Technical Innovation
They ask: "What's the simplest solution that someone would pay for?" not "What's the most elegant technical solution?"

## The Uncomfortable Truth

If you want to build a profitable side project, you need to spend more time talking to customers than writing code. For every hour you spend coding, you should spend two hours on customer research, marketing, and sales.

This feels wrong to engineers. We got into tech to avoid talking to people. But if you want to make money, customer conversations are more important than code quality.

## What to Do Next

Before you start your next side project:

1. **Identify a expensive problem:** Find something people already pay money to solve
2. **Talk to 20 potential customers:** Understand how they currently solve it and what they'd pay for a better solution
3. **Build the smallest possible solution:** Focus on business value, not technical perfection
4. **Pre-sell before you scale:** Get paying customers before you add features

The goal isn't to build the perfect product. It's to build something imperfect that people will pay for.

## The Reality Check

Most engineers reading this will ignore this advice. You'll continue building cool things that nobody wants to buy. Your GitHub will be full of impressive projects that generated $0.

But a few of you will take this seriously. You'll swallow your pride, talk to customers, and build something people actually want to pay for.

Those are the engineers who turn their side projects into real businesses.

The choice is yours.`,
    relatedArticles: ['market-size-vs-market-access', 'paying-customer-test']
  },
  {
    slug: '10k-validation-test-before-you-code',
    title: 'The $10K Validation Test (Before You Write Code)',
    description: 'A simple framework to validate your side project idea before you waste months building something nobody wants.',
    category: 'picking-winners',
    readTime: '6 min',
    difficulty: 'Tactical',
    publishedDate: '2024-01-08',
    tags: ['validation', 'market-research', 'pre-launch'],
    content: `# The $10K Validation Test (Before You Write Code)

Most engineers waste 6 months building products that will never make $1. Here's how to validate your idea in 2 weeks instead.

## The $10K Validation Test

Before you write any code, you need to prove that people will pay for your solution. Not might pay. Not could pay. Will pay.

The test is simple: **Can you find 10 people willing to pay you $1,000 each for your solution?**

If you can't, you don't have a business. You have an expensive hobby.

## Why $10K Matters

$10K isn't arbitrary. It's the minimum viable revenue that makes a side project worth your time:

- **Covers your costs:** Hosting, tools, domain, maybe a contractor
- **Pays you something:** $500-1000/month for your effort  
- **Proves market demand:** People who pay $1K care about the problem
- **Creates momentum:** Success builds on success

## The 2-Week Validation Framework

### Week 1: Problem Research

**Days 1-2: Identify Your Hypothesis**
Write down:
- What problem you're solving
- Who has this problem
- How they currently solve it
- Why your solution is better

**Days 3-5: Find Your People**
Locate 50+ potential customers:
- LinkedIn searches
- Reddit communities  
- Industry forums
- Twitter hashtags
- Facebook groups

**Days 6-7: Start Conversations**
Reach out to 20 people with a simple message:
"Hi [Name], I'm researching [problem]. Do you currently struggle with [specific pain point]? I'd love to learn about your experience."

### Week 2: Solution Validation

**Days 8-10: Deeper Interviews**
Have 10+ detailed conversations asking:
- "Walk me through how you currently handle this"
- "What does this problem cost you in time/money?"
- "What would an ideal solution look like?"
- "What would you pay for that solution?"

**Days 11-12: Create a Simple Offer**
Build a basic landing page describing your solution. Include:
- Clear problem statement
- Your proposed solution
- Price: $1,000/year
- "Reserve your spot" button

**Days 13-14: Test Willingness to Pay**
Send your landing page to everyone you talked to:
"Based on our conversation, I'm building [solution]. Would you be interested in being an early customer?"

## What Success Looks Like

After 2 weeks, you should have:
- **10+ quality conversations** about the problem
- **3+ people** who said they'd pay $1,000 for a solution
- **1-2 people** who actually clicked "Reserve your spot"
- **Clear understanding** of what people want

If you don't have this, **don't build anything yet.** Go back and find a better problem.

## Common Validation Mistakes

### 1. Asking Leading Questions
**Wrong:** "Would you use a tool that automatically syncs your calendar?"
**Right:** "How do you currently manage your calendar across devices?"

### 2. Talking to Friends and Family
Your mom will lie to you. Your coworkers will be polite. Talk to strangers who have the problem.

### 3. Accepting "Yeah, that sounds cool"
Cool doesn't pay bills. You need "I would buy this tomorrow if it existed."

### 4. Validating Features Instead of Problems
Don't ask if they want your specific solution. Ask how they solve the problem today.

## When Validation Fails

If you can't find 10 people willing to pay $1,000, you have options:

### Option 1: Pivot the Audience
Maybe the problem is real, but you're targeting the wrong people. Try:
- Different company sizes
- Different industries  
- Different geographies
- Different roles/titles

### Option 2: Pivot the Problem
Maybe your audience is right, but the problem isn't painful enough. Look for:
- More expensive problems they have
- More frequent problems they face
- Problems they're already paying to solve

### Option 3: Pivot the Price
Maybe $1,000 is wrong. Test:
- $100/month instead of $1,000/year
- $5,000 one-time instead of recurring
- Freemium with paid features

### Option 4: Kill the Idea
Sometimes the best decision is to stop. Better to kill a bad idea in 2 weeks than 6 months.

## Real Example: How I Validated GTM Night Shift

When I started this newsletter, I didn't write any articles first. I:

1. **Found 50 engineers** on LinkedIn building side projects
2. **Had 20 conversations** about their biggest marketing challenges  
3. **Discovered the pattern:** Everyone struggled with customer acquisition
4. **Created a simple survey** asking "Would you pay $10/month for weekly GTM tactics?"
5. **Got 15 "yes" responses** before writing a single article

That's how I knew there was demand.

## Your Next Steps

Don't code anything this week. Instead:

1. **Pick one problem** you want to solve
2. **Find 50 people** who might have this problem
3. **Start 20 conversations** about how they currently solve it
4. **Create a simple landing page** with your proposed solution
5. **Test willingness to pay** before you build

If you can't validate demand in 2 weeks, you'll never build a profitable product in 6 months.

The validation test saves you from the most expensive mistake in side projects: building something nobody wants.`
  },
  {
    slug: 'anonymous-saas-launch-without-boss-knowing',
    title: 'Anonymous SaaS: How to Launch Without Your Boss Knowing',
    description: 'A complete guide to launching your side project while employed at a large corporation, including legal protection and operational security.',
    category: 'ship-it',
    readTime: '12 min',
    difficulty: 'Advanced tactics',
    publishedDate: '2024-01-22',
    tags: ['legal', 'employment', 'anonymous-launch', 'corporate'],
    content: `# Anonymous SaaS: How to Launch Without Your Boss Knowing

You work at Google/Meta/Microsoft. You make $200K+. You have a side project idea that could work. But your employment contract says everything you build belongs to your employer.

Here's how to launch anyway, legally and safely.

## The Corporate Trap

Most FAANG employment contracts include:
- **Assignment of inventions:** Anything you build during employment belongs to them
- **Non-compete clauses:** You can't work on competing products
- **Approval requirements:** Side projects need company permission
- **Broad definitions:** "Related to company business" covers everything

But there are legal ways around these restrictions.

## Legal Foundation: What You Need to Know

### 1. State Laws Override Contracts
California, Delaware, and several other states have laws protecting employee inventions that:
- Use no company resources
- Developed entirely on your own time  
- Don't relate to company business
- Don't result from company work

### 2. The "Entirely Own Time" Requirement
This means:
- No company laptop/wifi
- No company time (including breaks)
- No company resources or facilities
- No company information or contacts

### 3. Unrelated to Company Business
The product must be genuinely unrelated to:
- Your day job responsibilities
- Your company's current products
- Your company's announced future plans
- Your team's work or knowledge

## The Anonymous Launch Strategy

### Phase 1: Legal Protection

**Step 1: Review Your Contract**
- Get a lawyer to review your employment agreement  
- Research your state's employee invention laws
- Document what's protected vs. what's restricted

**Step 2: Choose Your Business Structure**
- Form an LLC in Delaware (privacy-friendly)
- Use a registered agent service (not your address)
- Don't use your name in the business name
- Consider a trust structure for additional privacy

**Step 3: Document Everything**
- Keep detailed records of all development
- Timestamp your work (git commits work)
- Never use company resources
- Work only from personal devices on personal time

### Phase 2: Operational Security

**Step 1: Separate Everything**
- Different email address (not Gmail if you work at Google)
- Different cloud services (not AWS if you work at Amazon)
- Different payment systems
- Different physical location for work

**Step 2: Anonymous Business Identity**
- Use a business name unrelated to your real name
- Register domain with privacy protection
- Use virtual addresses for business registration
- Consider using a pen name/business persona

**Step 3: Payment and Banking**
- Open business bank account under LLC name
- Use business credit card, not personal
- Set up payment processing under business name
- Keep business and personal finances completely separate

### Phase 3: Product Launch

**Step 1: Anonymous Marketing**
- Create separate social media accounts
- Write content under business name/pen name
- Use stock photos or illustrations (not your photo)
- Engage in communities without revealing identity

**Step 2: Customer Interactions**
- Use business email for all communications
- Consider hiring a VA to handle customer service
- Never mention your day job or employer
- Keep personal and business identities separate

**Step 3: Revenue and Growth**
- All revenue goes to business account
- Pay yourself a salary from the business
- Reinvest profits back into the business
- Scale using contractors, not employees initially

## Risk Management

### What's Relatively Safe:
- B2B SaaS for industries unrelated to your employer
- Consumer apps in different markets
- Educational/informational products
- Simple productivity tools

### What's High Risk:
- Anything competing with your employer
- Products using knowledge from your day job
- Tools that could benefit your current company
- Anything in your employer's strategic focus areas

### Red Flags to Avoid:
- Using company email/accounts for anything
- Working on company property/network
- Mentioning your side project at work
- Connecting business to your personal identity
- Using company connections for business

## The Disclosure Decision

Eventually, you may need to disclose your side project if:
- Revenue exceeds $50K/year (varies by company)
- You want to work on it full-time
- Your company directly asks about side projects
- You want to hire employees

### Disclosure Strategy:
1. **Wait until profitable:** Don't disclose failed experiments
2. **Get legal advice first:** Understand your position
3. **Present as fait accompli:** "I have a successful business" vs. "I want to start something"
4. **Emphasize separation:** Show how it's unrelated to your job
5. **Be prepared to choose:** They may ask you to shut it down or quit

## Common Mistakes That Get You Caught

### 1. Using Company Resources
- Working on company laptop/network
- Using company Slack/email for side project
- Working during company time
- Using company cloud credits/accounts

### 2. Social Media Mistakes
- Posting about side project on personal accounts
- Connecting business social media to personal
- Using same username across personal and business
- Posting during work hours consistently

### 3. Financial Mistakes
- Mixing personal and business finances
- Using personal PayPal/Stripe for business
- Not forming proper business entity
- Taking payments in your personal name

### 4. Networking Mistakes
- Pitching to coworkers or company contacts
- Attending company events as your business
- Using company relationships for customers
- Mentioning company name in business context

## Success Stories

**Engineer at Meta:** Built anonymous B2B tool for restaurants, grew to $10K/month, eventually disclosed after leaving company. Key: completely unrelated industry.

**Google Software Engineer:** Created anonymous course selling platform, $50K/year revenue. Key: used pen name, hired VA for customer service.

**Microsoft PM:** Anonymous newsletter and coaching business, $30K/year. Key: different industry focus, never mentioned day job.

## Legal Disclaimer

This is not legal advice. Laws vary by state and situation. Get a real lawyer to review your specific case. Employment contracts differ significantly between companies.

Some companies are more restrictive than others. When in doubt, err on the side of caution.

## Your Action Plan

If you want to launch anonymously:

### Week 1:
- [ ] Get lawyer to review your employment contract  
- [ ] Research your state's employee invention laws
- [ ] Choose business structure and state

### Week 2:
- [ ] Form LLC with registered agent
- [ ] Set up business bank account
- [ ] Register business domain with privacy protection
- [ ] Create separate email/social accounts

### Week 3:
- [ ] Set up development environment on personal devices
- [ ] Create development and launch timeline
- [ ] Start building with careful documentation
- [ ] Set up basic business operations

### Week 4:
- [ ] Launch MVP anonymously
- [ ] Start marketing under business identity
- [ ] Set up customer support systems
- [ ] Monitor and iterate

Remember: The goal isn't to hide forever. It's to protect yourself during the vulnerable early stages and prove the business works before having difficult conversations with your employer.

Many successful entrepreneurs started this way. The key is doing it legally, carefully, and with proper protection.`
  }
];

export const getArticlesByCategory = (category: string): Article[] => {
  return articlesData.filter(article => article.category === category);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articlesData.find(article => article.slug === slug);
};

export const getAllArticles = (): Article[] => {
  return articlesData;
};

export const getRelatedArticles = (article: Article): Article[] => {
  if (!article.relatedArticles) return [];
  
  return article.relatedArticles
    .map(slug => getArticleBySlug(slug))
    .filter((article): article is Article => article !== undefined);
};

export const searchArticles = (query: string): Article[] => {
  const lowercaseQuery = query.toLowerCase();
  return articlesData.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.description.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.content.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterArticles = (articles: Article[], filters: {
  category?: string;
  difficulty?: string;
  readTime?: string;
  tags?: string[];
}): Article[] => {
  return articles.filter(article => {
    // Category filter
    if (filters.category && article.category !== filters.category) {
      return false;
    }

    // Difficulty filter
    if (filters.difficulty && article.difficulty !== filters.difficulty) {
      return false;
    }

    // Read time filter
    if (filters.readTime) {
      const readTimeNum = parseInt(article.readTime);
      switch (filters.readTime) {
        case 'short':
          if (readTimeNum >= 5) return false;
          break;
        case 'medium':
          if (readTimeNum < 5 || readTimeNum > 10) return false;
          break;
        case 'long':
          if (readTimeNum <= 10) return false;
          break;
      }
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        article.tags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

export const getAllTags = (): string[] => {
  const allTags = articlesData.flatMap(article => article.tags);
  return Array.from(new Set(allTags)).sort();
};

export const getPopularTags = (limit: number = 10): string[] => {
  const tagCounts = articlesData
    .flatMap(article => article.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
};
