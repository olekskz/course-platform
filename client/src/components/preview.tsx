export default function PreviewBanner() {
    return (
        <div className="bg-black text-white px-4 py-2 text-center">
            <p className="text-sm">
                Preview Mode - {' '}
                <a 
                    href="/api/preview/exit-preview"
                    className="underline hover:text-gray-200"
                >
                    Exit Preview Mode
                </a>
            </p>
        </div>
    );
}