import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import CategoryButton from "./CategoryButton";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import lottieJSON from '../lottieFiles/lottie.json'
export default function HeroSection({ post }) {
    const { title, excerpt, image, author, authorImage, date, readTime, slug } =
        post;

    return (
        <div className="relative w-full h-[80vh]  ">
          <div className="max-w-[1200px] mx-auto px-3  h-full w-full flex md:flex-row flex-col items-center  ">
{/* 
   <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
            /> */}
            <div className="flex-1 flex flex-col h-full md:items-start md:justify-center items-center p-5 md:p-0  gap-5">
               <h1 className=" text-center md:text-left  xl:text-6xl md:text-5xl text-4xl  font-bold md:max-w-[700px] max-w-[500px] dark:text-white">Discover blogs, share and explore the world with people</h1>
               <p className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md"><Link href="/signup" >Join our community </ Link></p>
            </div>




            <div className="dark:bg-[#999696] xl:w-[400px] md:w-[350px] w-[250px]  rounded-md h-[300px] md:ml-auto">
            <Lottie
             animationData={lottieJSON}
             loop={true}
             autoplay={true}
             style={{width:"100%",height:"100%",marginLeft:"auto"}}
            />
           </div>
            

          

            {/* <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex flex-col justify-end p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="mb-4 max-w-2xl">{excerpt}</p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span>{date}</span>
                        <span>·</span>
                        <span>{readTime}</span>
                    </div>

                    <Link
                        href={`/blog/${slug}`}
                        className="bg-white text-black px-4 py-2 rounded-md text-sm"
                    >
                        Read now
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src={authorImage}
                        alt={author}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span>{author}</span>
                </div>
            </div> */}
{/* 
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[...Array(5)].map((_, i) => (
                    <button
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                            i === 0 ? "bg-white" : "bg-white/50"
                        }`}
                    ></button>
                ))}
            </div> */}
          </div>
        </div>
    );
}
