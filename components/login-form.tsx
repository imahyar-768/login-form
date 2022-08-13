import {Formik, Field, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import Router from 'next/router'
import styles from './login-form.module.css';
import { User } from '../interface';

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
                values: User,
                { setSubmitting }: FormikHelpers<User>
            ) => {
                setTimeout(() => {
                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify(values)
                    })
                    .then(res => res.json())
                    .then(data => Router.push("/profile"))
                    .finally(() => {
                        setSubmitting(false);
                    })
                }, 500)
                
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email:</label>
                        <Field className='form-control' id="email" name="email" type='email' placeholder="Email" />
                        {errors.email && touched.email ? <div className={styles.error}>{errors.email}</div> : null}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Password:</label>
                        <Field id="password" className='form-control' name="password" type='password' placeholder="Password" />
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