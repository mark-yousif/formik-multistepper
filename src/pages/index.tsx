import {Field, ErrorMessage} from "formik";
import {object, string} from "yup";
import {FormikStep, FormikStepper} from "@components/step";

interface IForm {
    name: string;
    email: string;
}

const initialValues: IForm = {
    name: "",
    email: ""
}

const homePage = () => {
    return (
    <>
        <FormikStepper
            initialValues={initialValues}
            onSubmit={ async (values: IForm) => {alert(JSON.stringify(values))}}
            >
            <FormikStep 
                validationSchema={object({email: string().required().email()})}
            >
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="email"/>
                <ErrorMessage name="email"/>
            </FormikStep>
            <FormikStep
                validationSchema={object({name: string().required()})}
            >  
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" placeholder="name"/>
                <ErrorMessage name="name"/>
            </FormikStep>
        </FormikStepper>
    </>
    )
}

export default homePage;
