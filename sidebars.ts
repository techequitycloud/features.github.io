import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Workflows',
      items: [
        'workflows/getting-started',
        'workflows/user',
        'workflows/partner',
        'workflows/admin',
        'workflows/agent',
        'workflows/finance',
        'workflows/support',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/users',
        'features/partners',
        'features/admins',
        'features/agents',
        'features/finance',
        'features/support',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/user-guide',
        'guides/partner-guide',
        'guides/admin-guide',
        'guides/agent-guide',
        'guides/finance-guide',
        'guides/support-guide',
      ],
    },
    {
      type: 'category',
      label: 'Platform',
      items: [
        'platform/modules',
        'platform/notifications',
        'platform/settings',
      ],
    },
    {
      type: 'category',
      label: 'Users',
      items: [
        'users/user-management',
        'users/invites',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/partner-modules',
        'modules/platform-modules',
        'modules/ratings',
        'modules/statistics',
      ],
    },
    {
      type: 'category',
      label: 'Billing',
      items: [
        'billing/overview',
        'billing/credits',
        'billing/credit-management',
        'billing/transactions',
        'billing/settings',
        'billing/subscriptions',
        'billing/project-costs',
        'billing/invoices',
        'billing/roi',
        'billing/buy-credits',
        {
            type: 'category',
            label: 'Revenue',
            items: [
                'billing/revenue/agent-revenue',
                'billing/revenue/agent-module-revenue',
                'billing/revenue/module-revenue',
                'billing/revenue/partner-revenue',
                'billing/revenue/user-revenue',
            ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Support',
      items: [
        'support/overview',
        'support/help-center',
      ],
    },
    {
        type: 'category',
        label: 'Integration',
        items: [
          'integration/deployments',
          'integration/jules',
        ],
      },
  ],
};

export default sidebars;
