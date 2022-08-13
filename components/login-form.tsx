import {Formik, Field, Form, FormikHelpers} from 'formik';
import styles from './login-form.module.css';

interface Values {
    username: string;
    password: string;
}

const LoginForm = () => {
    return (
        <div className={styles.login_box + ' p-3'}>
        <h1 className='display-6 mb-3'>Login</h1>    
        <Formik 
            initialValues = {{
                username: '',
                password: '',
            }}    
            onSubmit = {(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false);
                }, 500)
                
            }}
        >
            <Form>
                <div className='mb-3'>
                    <Field id="username" name="username" placeholder="Username" />
                </div>
                <div className='mb-3'>
                    <Field id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className='btn btn-primary'>Login</button>
            </Form>
            
        </Formik>
        </div>
    )
}

export default LoginForm;