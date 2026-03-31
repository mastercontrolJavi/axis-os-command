'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BudgetClient } from '@/components/budget/budget-client'
import { SpendingOverview } from '@/components/budget/spending-overview'
import { BudgetLimits } from '@/components/budget/budget-limits'
import { RecurringTracker } from '@/components/budget/recurring-tracker'
import { SpendingInsights } from '@/components/budget/spending-insights'

export const dynamic = 'force-dynamic'

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-tight">Budget & Finance</h2>
        <p className="text-sm text-muted-foreground">Track spending, limits, and financial patterns</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="inline-flex gap-1 overflow-x-auto bg-transparent p-0 mb-8 h-auto">
          {(['overview', 'spending', 'budgets', 'recurring', 'insights'] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-full px-5 py-2 text-sm font-medium capitalize transition-all data-[state=active]:bg-ios-blue data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-foreground/60 data-[state=inactive]:hover:text-foreground data-[state=inactive]:bg-transparent"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <BudgetClient onNavigate={setActiveTab} />
        </TabsContent>

        <TabsContent value="spending">
          <SpendingOverview />
        </TabsContent>

        <TabsContent value="budgets">
          <BudgetLimits />
        </TabsContent>

        <TabsContent value="recurring">
          <RecurringTracker />
        </TabsContent>

        <TabsContent value="insights">
          <SpendingInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
