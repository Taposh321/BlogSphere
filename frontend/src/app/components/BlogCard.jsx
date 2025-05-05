import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
    category,
    image,
    title,
    excerpt,
    date,
    readTime,
    author,
    authorImage,
    slug,
}) {
    return (
        <div className="rounded-lg overflow-hidden shadow-md gap-5 p-3 ">
            <div className="relative">
                <Image
                    src={image || "/placeholder.jpg"}
                    alt={title}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-white py-1 px-3 rounded-full text-xs">
                        {category}
                    </span>
                </div>
            </div>

            <div className=" dark:text-white  text-black">
                <h3 className="font-bold text-lg mb-2">
                    <Link
                        href={`/blog/${slug}`}
                        className="hover:text-blue-500"
                    >
                        {title}
                    </Link>
                </h3>
                {excerpt && (
                    <p className="text-gray-600 dark:text-white text-sm mb-4">{excerpt}</p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {authorImage && (
                            <Image
                                src={authorImage}
                                alt={author}
                                width={30}
                                height={30}
                                className="rounded-full h-8 w-8 object-cover"
                            />
                        )}
                        <span className="text-xs">{author}</span>
                    </div>
                    {date && readTime && (
                        <div className="text-xs dark:text-white text-gray-500">
                            {date} · {readTime}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


