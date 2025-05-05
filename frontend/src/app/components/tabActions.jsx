"use client"
import { useState,useEffect } from "react"
import { BeatLoader } from "react-spinners";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
export default function TabActions({tabs,itemInfo}){
  //tab[0] is default tab for all
  const [activeTab,setActiveTab] = useState(tabs[0].content);
  const [tabData,setTabData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState(null);
  const {user,token} =useAuth();


const mocPostData =[
  {
    id:"09876567",
    title:"Discovering culture of Africa",
    likes:"10k",
    comments:"100",
    shares:"100k",
    published:"Jan 1, 2025",
    updated:"Feb 2, 2025",  
    status:"Published"
  },
  {
    id:"0925615",
    title:"Exploring ancient Pyramids",
    likes:"100k",
    comments:"10k",
    shares:"100k",
    published:"Jan 1, 2025",
    updated:"Feb 2, 2025",
    status:"Published"
  },
  {
    id:"09258768",
    title:"Banglasdesh is ahead of new era !",
    likes:"10M",
    comments:"100k",
    shares:"20k",
    published:"Jan 1, 2025",
    updated:"Feb 2, 2025",
    status:"Published"

  }
]
  
    // useEffect(()=>{
    //  setErr(null)
    //   //fecth data from collections by userid  or username
    //  const currentTabAPI = tabs.find((item)=> item.content==activeTab)
    // if (!currentTabAPI?.api) return;

    // const fetchData = async ()=>{
    //   try{
    //     setLoading(true)
    //   const res =await fetch(currentTabAPI.api);
    //   if(!res.ok) throw new Error("Failed to fetch data")
    //   const data = await res.json();
    //    setTabData(data)
    // }catch(err){
    //  setLoading(false)
    //  setErr(err)
    //    }
    //    finally{
    //     setLoading(false)
    //    }
    //   }
    //   fetchData();
  
    // },[activeTab,tabs])

const content =()=>{
     switch (activeTab) {
      case "All posts" :
      return <AllPosts data={mocPostData} />
    
      case "Pending posts":
       return <PendingPosts data={tabData} />
      
      case "Suspended":
      return <Suspended data={tabData} />
      
      case "Actions":
      return <Action data ={ tabData} />
    
     }
}


return(<>
   <div className="flex flex-col  flex-1  bg-white p-3 rounded-md">
        <div className="flex gap-3 text-gray-700">
          {
            tabs.map((item,i)=> <div key={i} onClick={()=> setActiveTab(item.content)    } className="cursor-pointer hover:bg-gray-300 px-3 py-1 text-sm">{item.content} </div>
          )
          }
            
        </div>
        <div className="w-full flex-1 h-full  ">
           {
            loading &&<div className="w-full h-full flex justify-center items-center text-red-500 font-bold "> <BeatLoader  color="gray" size="10px"/>  </div>
           }
           {
            err && <div className="w-full h-full flex justify-center items-center text-red-500 font-bold ">Something went wrong ! Need to set up proper api </div>
           }
           
            <div className="p-3"> {content()}</div> :
           
        </div>

      </div>
</>)

}


const AllPosts =({data})=>{

  //fetch all post of a user
  return(<>
    <div>
    <table className="w-full table-auto text-sm mt-4">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border-b p-3 text-left">Id</th>
              <th className="border-b p-3 text-left">Title</th>
              <th className="border-b p-3 text-left">Published</th>
              <th className="border-b p-3 text-left">Likes</th>
              <th className="border-b p-3 text-left">Comments</th>
              <th className="border-b p-3 text-left">Updated </th>
              <th className="border-b p-3 text-left">Status </th>

              <th className="border-b p-3 text-center">Actions </th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {data?.map((post,i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border-b p-3">{post?._id || "N/A"}</td>
                <td className="border-b p-3">{post?.title || "N/A"}</td>

                <td className="border-b p-3">
                  {new Date(post.published).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border-b p-3">{post?.likes || "N/A"}</td>
                <td className="border-b p-3">{post?.comments || "N/A"}</td>
                <td className="border-b p-3">{ 
                    new Date(post.updated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) 
                  }</td>
               <td className="border-b p-3">{post?.status || "N/A"}</td>


                <td className="border-b">
                  <div className="flex gap-2 items-center w-full">
                  <div className=" text-sm px-3 rounded-md bg-red-400 text-white">Delete</div>
                  <div className=" text-sm px-3 rounded-md text-red-black">Suspend</div>
                  <Link
                    href={`/dashboard/posts/${post?.id}`}
                    className="text-sm cursor-pointer text-[#00B087] bg-[#16C098]/50 px-3 rounded text-center border border-[#16C098]"
                  >
                    View post
                  </Link>
                  </div>
                 

                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
    
    </>)

}

const PendingPosts =({data})=>{
  //Fetch all pending post
  return(<>
    <div>
    List of all pending posts
    </div>
    
    </>)

}

const Suspended =({data})=>{
  return(<>
    <div>
    List of all suspended posts
    </div>
    
    </>)

}
const Action =({data})=>{
  return(<>
    <div className="w-full h-full flex flex-col justify-center items-center ">
   <div className="border p-3 ">
   <span className="text-sm font-bold">Suspend user account</span> 
     <input type="text" className="border-gray-500 p-" placeholder="Describe the reason" />
    
    </div>
    </div>
    
    </>)

}
