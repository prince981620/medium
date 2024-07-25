import { AuthSignup } from "../component/AuthSignup"
import { Quote } from "../component/Quote"

export const Signup = ()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <AuthSignup/>
        </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
}