import {FormikValues, FormikConfig, Formik, FormikHelpers, Form} from "formik";
import {ReactElement, Children, useState} from "react";

export interface FomrikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {};

const Step = ({children}: FomrikStepProps) => <>{children}</>;

export default Step;

/**********
STEPPER
*********/

export const FormikStepper = ({children, ...props}: FormikConfig<FormikValues>) => {
    const childrenArray = Children.toArray(children) as ReactElement<FormikStepProps>[];
    const [step, setStep] = useState<number>(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState<boolean>(false);

    const isLastStep = () => step === childrenArray.length - 1;
    
    const checkStepOnSubmit = async (values: any, helpers: FormikHelpers<any>) => {
        if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
        }
        else setStep((s) => s + 1);
    }


    return (
    <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={(values, helpers) => checkStepOnSubmit(values, helpers)}
        >
        {({isSubmitting}) => (
            <Form>
                {/*STEPPER*/}
                {currentChild}
                {step === 1 ?<button 
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep((s) => s - 1)}>
                Back
                </button>: null}
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
                </button>
            </Form>
        )}
    </Formik>
    )
};

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
    //label: string;
}

export const FormikStep = ({ children }: FormikStepProps) => <>{children}</>;

