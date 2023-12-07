import HistoryComponent from '@/components/HistoryComponent'
import MaxWrapper from '@/components/MaxWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserSession } from '@/lib/nextauth'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'


export const metadata: Metadata = {
  title: "Dashboard | LearnIt",
  description: "Home"
}

async function Page() {
    const session = await getUserSession()

    if (!session?.user) return redirect("/")
  return (
    <MaxWrapper>
        <Card>
            <CardHeader>
                <CardTitle className='text-3xl'>Your Activity History.</CardTitle>
            </CardHeader>
            <CardContent>
                <HistoryComponent limit={120} userId={session?.user.id} />
            </CardContent>
        </Card>
    </MaxWrapper>
  )
}

export default Page