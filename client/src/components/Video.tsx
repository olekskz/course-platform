export default function Video({ path }: { path: string }) {
    return (
        <iframe src={path} width={320} height={240} allowFullScreen></iframe>
    )
}
