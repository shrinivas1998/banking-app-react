import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FieldError";
import { useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ValidatorService } from "service/validator";
import s from "./style.module.css";
const VALIDATOR = {
    title : (value) => {
        return ValidatorService.min(value,3) || ValidatorService.max(value,20);
    },
    content : (value) => {
        return ValidatorService.min(value,3);
    } 
}
console.log(VALIDATOR.title("Hello"))
export function NoteForm({
                    isEditable=true,
                    note,
                    title, 
                    onClickEdit, 
                    onClickDelete, 
                    onSubmit}) {
    const [formValue, setFormValue] = useState({
                                            title: note?.title || "", 
                                            content: note?.content});
    const [formErrors, setFormErrors] = useState({
        title: note?.title ? undefined: true,
        content: note?.content ? undefined: true
    })
    const updateFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({...formValue, [name]: value});
        validate(name, value);
    }
    const validate = (fieldName, fieldValue) => {
        setFormErrors({...formErrors,
                      [fieldName]:VALIDATOR[fieldName](fieldValue)})
    }
    const actionIcon = (
        <div>
            <div className="col-1">
                { onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon}/>}
            </div>
            <div className="col-1">
                {onClickDelete && <TrashFill onClick={onClickDelete} className={s.icon}/>}
            </div>
        </div>
    )
    const titleInput = (
        <div className="mb-5">
            <label className="form-label">Title</label>
            <input 
                onChange={updateFormValues} 
                type="text"
                name="title" 
                className="form-control" 
                value={formValue.title}
                />
            <FieldError msg={formErrors.title} />
        </div>
    )
    const contentInput =(
        <div className="mb-5">
            <label className="form-label">Content</label>
            <textarea 
                onChange={updateFormValues}
                type="text" 
                name="content" 
                className="form-control" 
                row="5"
                value={formValue.content} 
            />
            <FieldError msg={formErrors.content} />
        </div>
    ) 
    const hasError = () => {
        for( const fieldName in formErrors){
            if(formErrors[fieldName]){
                return true
            }
        }
        return false
    }   
    const submitBtn = <div>
        <div className={s.submit_btn}>
            <ButtonPrimary isDisabled={hasError()} onClick={() => onSubmit(formValue)}>Submit</ButtonPrimary>
        </div>
    </div>    
    return (
        <div className={s.container}>
            <div className="row justify-content-space-between">
                <div className="col-10">
                    <h2 className="mb-3">{title}</h2>
                </div>
                {actionIcon}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>
                {isEditable && titleInput}</div>
            <div className="mb-3" >
                {isEditable ? contentInput: <pre>{note.content}</pre> }
                </div>
            {onSubmit && submitBtn}
        </div>
    )
}