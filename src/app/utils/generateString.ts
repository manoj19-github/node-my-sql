import randomstring from "randomstring"
const generateString=():string=>{
    const random=randomstring.generate({
        length:5,
        readable:true,
        charset:"numeric"
    })
    return random
}
export default generateString