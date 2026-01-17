'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/context/auth-context'
import { PLAN_FEATURES, type PlanType } from '@/lib/stripe/plans'
import { Check, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BillingPage() {
  const searchParams = useSearchParams()
  const { user, profile, refreshProfile } = useAuth()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const handleCheckout = async (plan: 'BASIC' | 'PRO') => {
    if (!user) return

    setIsLoading(plan)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId: user.uid }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const handlePortal = async () => {
    if (!user) return

    setIsLoading('portal')
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Portal error:', data.error)
      }
    } catch (error) {
      console.error('Portal error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const currentPlan = profile?.plan || 'FREE'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Success/Cancel Messages */}
      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-4 py-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                Subscription successful!
              </p>
              <p className="text-sm text-green-700">
                Your plan has been upgraded. Enjoy your new features!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {canceled && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">
                Checkout canceled
              </p>
              <p className="text-sm text-amber-700">
                No changes have been made to your subscription.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the {PLAN_FEATURES[currentPlan].name} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                ${PLAN_FEATURES[currentPlan].price}
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                {typeof PLAN_FEATURES[currentPlan].recipes === 'number'
                  ? `${PLAN_FEATURES[currentPlan].recipes} recipes`
                  : 'Unlimited recipes'}
                {' • '}
                {typeof PLAN_FEATURES[currentPlan].exportsPerDay === 'number'
                  ? `${PLAN_FEATURES[currentPlan].exportsPerDay} exports/day`
                  : 'Unlimited exports'}
              </p>
            </div>
            {currentPlan !== 'FREE' && (
              <Button
                variant="outline"
                onClick={handlePortal}
                disabled={isLoading === 'portal'}
              >
                {isLoading === 'portal' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Manage Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {(Object.keys(PLAN_FEATURES) as PlanType[]).map((planKey) => {
          const plan = PLAN_FEATURES[planKey]
          const isCurrent = currentPlan === planKey
          const isUpgrade =
            (currentPlan === 'FREE' && planKey !== 'FREE') ||
            (currentPlan === 'BASIC' && planKey === 'PRO')

          return (
            <Card
              key={planKey}
              className={cn(
                'relative',
                isCurrent && 'border-primary',
                planKey === 'PRO' && 'border-primary shadow-lg'
              )}
            >
              {planKey === 'PRO' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrent ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : isUpgrade && planKey !== 'FREE' ? (
                  <Button
                    className="w-full"
                    onClick={() => handleCheckout(planKey as 'BASIC' | 'PRO')}
                    disabled={isLoading === planKey}
                  >
                    {isLoading === planKey ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Upgrade to {plan.name}
                  </Button>
                ) : planKey === 'FREE' && currentPlan !== 'FREE' ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handlePortal}
                    disabled={isLoading === 'portal'}
                  >
                    Downgrade
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    {planKey === 'FREE' ? 'Free' : 'Contact Sales'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Can I cancel anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time from the Manage 
              Subscription page. You'll keep access until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-medium">What happens to my recipes if I downgrade?</h3>
            <p className="text-sm text-muted-foreground">
              Your recipes are always saved. On the Free plan, you can still view 
              and edit them, but you'll only be able to export 3 recipes and 3 labels per day.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Do you offer refunds?</h3>
            <p className="text-sm text-muted-foreground">
              We offer a full refund within 7 days of your first subscription payment 
              if you're not satisfied with MacroPrint.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
