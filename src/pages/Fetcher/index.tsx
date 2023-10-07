import {useEffect, useState} from "react";
import {T1, T2} from "src/data/types.ts";

function getCourse2(id,course_id) {
    return get(`https://edu.sirius.online/noo-back/v74.11/course/${course_id}/learn/${id}`, fetch(`https://edu.sirius.online/noo-back/v74.11/course/${course_id}/learn/${id}`, {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ru;q=0.7",
            "authorization": "Bearer eyJhbGciOiJQUzUxMiJ9.eyJmaXJzdE5hbWUiOiLQkNC70LXQutGB0LDQvdC00YAiLCJlbWFpbCI6ImFsZWtzYW5kYXJib3J0dWxldkB5YW5kZXgucnUiLCJwYXJlbnRDb2RlIjoiNEQ3TXFWa0R6bk43IiwiaWQiOiIxMDAxMjAwODA1MTAxNzc0MjEiLCJsYXN0TmFtZSI6ItCR0L7RgNGC0YPQu9C10LIiLCJpYXQiOjEuNjk2NTk3OTA3ODk5NDQyODcxZTksIm1pZGRsZU5hbWUiOiLQodC10YDQs9C10LXQstC40YciLCJyb2xlcyI6WyJub29SVyJdLCJleHAiOjEuNjk3MjAyNzA3ODk5NDQyODcxZTl9.4e9MMM4ztBmb1xWP_o6sIty_DOsfPtK0mlIfgic6t1ZNwigs-Y-uuTDZ7f2ebYL0IDWQ-wsd7Lt0MghO7huXF6WatnbUk1lPypnXohTjhjPzGNdDUiy4JSjVNbP9mbZHe77C_ZEhHw374pUxtEsREfxs_9j_gHGrrMms7q2pKVQGou1-crMNmDNrtD60vudLER2-HEFHVBCuObjzGCOWrliZQkmS1VuUfMU5XePS3E8C9RmGhWBazHHkps8S9vEMCj4pTGu0YaVsKjYFt2Ph8CUXgXfnKxCzxeQsqYsdSJtijbECZUiiroktHddymoV06EnahM146wQ3bDC4OGI2QA",
            "content-type": "application/json",
            "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://edu.sirius.online/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    }));
}

function getCourse(id) {
    return get(`https://edu.sirius.online/noo-back/v74.11/course/${id}`, fetch(`https://edu.sirius.online/noo-back/v74.11/course/${id}`, {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ru;q=0.7",
            "authorization": "Bearer eyJhbGciOiJQUzUxMiJ9.eyJmaXJzdE5hbWUiOiLQkNC70LXQutGB0LDQvdC00YAiLCJlbWFpbCI6ImFsZWtzYW5kYXJib3J0dWxldkB5YW5kZXgucnUiLCJwYXJlbnRDb2RlIjoiNEQ3TXFWa0R6bk43IiwiaWQiOiIxMDAxMjAwODA1MTAxNzc0MjEiLCJsYXN0TmFtZSI6ItCR0L7RgNGC0YPQu9C10LIiLCJpYXQiOjEuNjk2NTk2OTQ4MTcwNTkwMDg0ZTksIm1pZGRsZU5hbWUiOiLQodC10YDQs9C10LXQstC40YciLCJyb2xlcyI6WyJub29SVyJdLCJleHAiOjEuNjk3MjAxNzQ4MTcwNTkwMDg0ZTl9.0ijvxDxc2yHsnYdBY4hOuJCKhHcn_4CmGZuTk6gf-G7G5BCCvxu8niBtUZoeyUeLWwL9jPY1Rmi2S9vrp8GOntc-cH09LjBaSskOcIyrZXl4Z4GmYMUBSfathzDMZww-24KJwp36qFHBTEYgAXkVx_94APajDxmC6j7oZvX7Wh3mXgQFzf3ZJeb1n3lSNOSByW7F9laPicfIUCHy4c5v2djuK2lPI5ysT-CGTAKx87PD4NVWdtxCuL5LFUBZu5eIZAyIgZbD4FqLv9aWyuiDQ7jaCyXE1mJPHR6uOh1Cms9ttQguXIdAWBZuzDwOoRJl33WUKrnICqdUCLTXSy19qg",
            "content-type": "application/json",
            "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://edu.sirius.online/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    }));
}

async function get(url:string,fetch):Promise<any>{
    const item=localStorage.getItem(url)
    if(item===null) {
        const r = await fetch
        console.log(`fetched ${url}`)
        const res= await r.json()
        localStorage.setItem(url,JSON.stringify(res))
        return res
    }
    // console.log(`got cached ${url}`)
    return JSON.parse(item)
}

function getResource(hash: string) {
    return get(`https://edu.sirius.online/noo-back/api/v2/content/${hash}`,
        fetch(`https://edu.sirius.online/noo-back/api/v2/content/${hash}`, {
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\""
            },
            "referrer": "https://edu.sirius.online/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        })
    );
}

async function getSubj(hash:string,id:string){
    const r=await getResource(hash)
    if(r.courseInfo.name==='Дополнительные главы химии. 8 класс. v1.8') getCh8(r.courseInfo,id)
}

async function extracted(res2, j: number):Promise<T2> {
    const element = res2.elements[j]
    const re2 = (await getResource(element.hash)).element
    if( re2.hasOwnProperty('video')){
        return {name:re2.video.title,t3s:[{
            type:'video',
                url:re2.video.url,
                text:re2.video.synopsis
        }]}
    }
    // if( re2.hasOwnProperty("task") )

}

async function getCh8(r,id){
    const result=[] as T1[]
    const res = await getCourse(id)
    const re=await getResource(res.hash)

    for (let i = 0; i < re.course.module.length; i++) {
        const module=re.course.module[i]
        if(module.dependencies.length===0){
            const t2s=[] as T2[]
            result.push({name:module.title,t2s:t2s})
            const res2 = await getCourse2(module.id,id)
            for (let j = 0; j <res2.elements.length; j++) {
                t2s.push(await extracted(res2, j))
            }
        }


    }
    console.log(result)
}

export default function Fetcher(){
    const [res, setRes] = useState("loading")
    useEffect(() => {
        async function f() {
            const obj=await get("https://edu.sirius.online/noo-back/v74.11/course/list-full",fetch("https://edu.sirius.online/noo-back/v74.11/course/list-full"))
            for (let i = 0; i < obj.my.length; i++) {
                if(obj.my[i].chainName==='chemistry8'){
                    getSubj(obj.my[i].hash,obj.my[i].id)
                }
            }
            setRes("done")
        }
        f();
    }, [])






    return <div>{res}</div>
}