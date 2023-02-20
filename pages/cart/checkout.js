import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function checkout({user}) {
const router = useRouter()
    useEffect(()=>{
        if(!Cookies.get('token')){
            router.back()
        }
    })
    if(!user){
        return(
            <>

            </>
        )
    }


  return (
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, assumenda beatae placeat consectetur aspernatur odio animi incidunt similique neque possimus officia explicabo ullam repellendus temporibus et corrupti optio sapiente quo nemo alias quasi, ratione nulla fuga. Ab praesentium, ipsum iusto quos tenetur alias veritatis! Delectus unde obcaecati eius temporibus voluptates animi voluptatum ducimus placeat! Est quidem vero nesciunt pariatur distinctio eveniet cum nam ratione molestiae, aspernatur quas rem ullam blanditiis! Explicabo optio alias odio? Possimus nemo laudantium facilis adipisci consequuntur iusto reprehenderit debitis quia voluptatem ratione vero culpa velit repellendus aliquid cupiditate nesciunt recusandae voluptates ex quidem, beatae optio exercitationem in neque. Atque cumque similique, iste magnam totam ipsum aperiam sint? In?
    </div>
  )
}

export default checkout
