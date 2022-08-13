import {Formik, Field, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import styles from './login-form.module.css';

interface Values {
    email: string;
    password: string;
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
     .required('Required') 
     .min(8, 'Password is too short - should be 8 chars minimum.')
     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})

const LoginForm = () => {
    return (
        <div className={styles.login_box + ' p-3'}>
        <h1 className='display-6 mb-3'>Login</h1>    
        <Formik 
            initialValues = {{
                email: '',
                password: '',
            }}
            validationSchema={SignupSchema}    
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
            {({ errors, touched }) => (
                <Form>
                    <div className='mb-3'>
                        <Field id="email" name="email" type='email' placeholder="Email" />
                        {errors.email && touched.email ? <div className={styles.error}>{errors.email}</div> : null}
                    </div>
                    <div className='mb-3'>
                        <Field id="password" name="password" placeholder="Password" />
                        {errors.password && touched.password ? (<div className={styles.error}>{errors.password}</div>) : null}
                    </div>
                    <button type="submit" className='btn btn-primary'>Login</button>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default LoginForm;