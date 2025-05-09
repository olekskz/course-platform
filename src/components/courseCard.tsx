import Link from "next/link";
import Image from "next/image";

export default function CourseCard({ title, desc, id }: { title: string, desc: string, id: string }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Image src="/assets/9178381_dev_code_development_programming_web_icon.png" alt="Course Image" width={200} height={150} className="rounded-lg mb-4" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-center mb-4">{desc}</p>
            <Link href={`courses/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">Learn More</Link>
        </div>
    );
}