"use client"
import { useState,useEffect } from "react"
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
export default function TabActions({tabs,userInfo}){
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
      return <AllPosts data={userInfo} token={token} />
    
      case "Pending posts":
       return <PendingPosts data={tabData} token={token}  />
      
      case "Suspended":
      return <Suspended data={tabData} token={token}  />
      
      case "Actions":
      return <Action data ={ userInfo} token={token}  />
    
     }
}


return(<>
   <div className="flex flex-col min-h-full  flex-1   p-3 rounded-md">
        <div className="flex gap-3 text-gray-700">
          {
            tabs.map((item,i)=> <div key={i} onClick={()=> setActiveTab(item.content)    } className="cursor-pointer hover:bg-gray-300 px-3 py-1 text-sm">{item.content} </div>
          )
          }
            
        </div>
        <div className="w-full   flex-1 flex h-full   ">
           {
            loading &&<div className="w-full h-full flex justify-center items-center text-red-500 font-bold "> <BeatLoader  color="gray" size="10px"/>  </div>
           }
           {
            err && <div className="w-full h-full flex justify-center items-center text-red-500 font-bold ">Something went wrong ! Need to set up proper api </div>
           }
           
            <div className="w-full min-h-full"> {content()}</div> 
           
        </div>

      </div>
</>)

}

const DeletePost =(postId,token)=>{

  const [loading,setLoading] =useState(false);
  const[loading2,setLoading2] = useState(false)
  const [err,setErr] =useState('');
   const deletePost = async (postId)=>{
try{
  setErr('');
  setLoading(true)
   const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,{
    method:"DELETE",
    headers:{Authorization:`Bearer ${token}`}
   });
  
   if (!res.ok){
    if(res.status=="404") throw new Error("Data not Found")
      else if( res.status=="400") throw new Error("Bad request")
       else if(res.status=="401") throw new Error("Unauthorized request")
        else if(res.status=="500") throw new Error("Internal server error , failed to fetch data.")
         else{
        throw new Error("Failed to fecth data")
      }
}
 
}catch(err){
 setErr(err.message)
 }
 finally{
  setLoading(false)
 }
   }
   return(<>
   <div onClick={()=>deletePost(postId)} className=" text-sm px-3 rounded-md bg-red-400 text-white">
                  {
                  loading? <ClipLoader size={10} />:(err? err:"Delete")
                  }
                  </div>
   </>
   )
   
}
const SuspendPost = (postId,token)=>{

  const [loading,setLoading] =useState(false);
  const[loading2,setLoading2] = useState(false)
  const [err,setErr] =useState('');
   const SuspendPost = async ()=>{
try{
  setErr('');
  setLoading(true)
   const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/suspension/post/${postId}`,{
    method:"PATCH",
    headers:{Authorization:`Bearer ${token}`}
   });
  
   if (!res.ok){
    if(res.status=="404") throw new Error("Data not Found")
      else if( res.status=="400") throw new Error("Bad request")
       else if(res.status=="401") throw new Error("Unauthorized request")
        else if(res.status=="500") throw new Error("Internal server error , failed to fetch data.")
         else{
        throw new Error("Failed to fecth data")
      }
}
 
}catch(err){
 setErr(err.message)
 }
 finally{
  setLoading(false)
 }
}
  


   return(<>
   
   <div onClick={()=>SuspendPost(postId)} className=" text-sm px-3 rounded-md bg-white shadow text-gray-600">
                  {
                  loading? <ClipLoader size={10} />:(err? err:"Suspend")
                  }
                  </div>
   </>
   )
   
}


const AllPosts =({data,token})=>{
 
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
              <th className="border-b p-3 text-left">Status </th>

              <th className="border-b p-3 text-center">Actions </th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {data.posts.map((post,i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border-b p-3">{post?._id || "N/A"}</td>
                <td className="border-b p-3">{post?.title || "N/A"}</td>

                <td className="border-b p-3">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border-b p-3">{post?.likes.length || 0 }</td>
                <td className="border-b p-3">{post?.comments.length || 0}</td>
                
               <td className="border-b p-3">{post?.status || "N/A"}</td>


                <td className="border-b">
                  <div className="flex gap-2 items-center w-full">
                 <DeletePost postId={post?._id} token={token} />
                 <SuspendPost postId={post?._id} token={token} />


                  <Link
                    href={`/dashboard/posts/${post?._id}`}
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
 const [loading,setLoading] =useState(true);
 const [err,setErr] = useState(null);
 const [reason,setReason] = useState("");

 const inputHandler =(e)=>{
      setReason(e.target.value);
  }
  const Suspend =async (id)=>{
    if(reason==="") {
      setErr("You must write a reason")
      return null;
    }

    try{
      setErr(null);
      setLoading(true);
      const res = fecth(`${process.env.NEXT_PUBLIC_API_URL}/admin/suspend/user/${id}`,{
                           headers: { Authorization: `Bearer ${token}` },
                       })
      if (!res.ok){
      if(res.status=="404") throw new Error("Data not Found")
        else if( res.status=="400") throw new Error("Bad request")
         else if(res.status=="401") throw new Error("Unauthorized request")
          else if(res.status=="500") throw new Error("Internal server error , failed to fetch data.")
           else{
          throw new Error("Failed to fecth data")
        }
  }                 
    }catch(err){
      setErr(err.massage)
    }

  }

  return(<>
    <div className="w-full h-full   ">
   <div className=" p-3 h-full w-full flex  gap-3 flex-col ">
   <span className="text-sm font-bold">Suspend user account :</span> 
     <input onChange={inputHandler} value={reason} type="text" className="border-gray-300 w-[200px] p-2 border" placeholder="Describe the reason" />
    <div className="text-sm text-red-400">{err&& err}</div>
    
     <button onClick={()=> Suspend(data._id)} className="bg-red-400 text-white rounded-md p-2 w-[100px]">Suspend</button>
    </div>
    </div>
    
    </>)

}
