import react,{useState} from 'react';
import style from "./contact.module.css";
export const Contact=()=>{
    return(
    <>
    <section>
        <form>
            <label className={style.name}>Name</label>
            <input type="text" name="name" required />
            <label className={style.name}>Email</label>
            <input type="email" name="email" required />
            <label className={style.name}>Message</label>
            <textarea name="message" required></textarea>
            <button type="submit">Submit</button>
        </form>
    </section>
    </>
)}