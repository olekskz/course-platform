import Link from "next/link";
import Image from "next/image";

export default function CourseCard({ title, id, image }: { title: string, id: string, image: string }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Image src={image} alt="Course Image" width={200} height={150} className="rounded-lg mb-4" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <Link href={`courses/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">Learn More</Link>
        </div>
    );
}