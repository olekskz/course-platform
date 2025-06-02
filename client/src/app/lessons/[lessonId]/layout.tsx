import { headers } from 'next/headers'
import PreviewBanner from '@/components/preview'

export default async function LessonLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headersList = headers()
    const isPreview = (await headersList).get('x-preview') === 'true'

    return (
        <>
            {isPreview && <PreviewBanner />}
            {children}
        </>
    )
}