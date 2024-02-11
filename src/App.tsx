import './App.css'
import z, { ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'


function App() {
// We define our data types
  type FormData = {
    firstname: string;
    secondname: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  
  }

  // We define our schema
  const schema:ZodType<FormData> = z.object({
    firstname: z.string().min(3).max(20),
    secondname: z.string().max(20).min(3),
    email: z.string().email(),
    age: z.number().min(18).max(76),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~=\-{}\[\]:";'<>?,.\/]).{8,20}$/),
    confirmPassword: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~=\-{}\[\]:";'<>?,.\/]).{8,20}$/),
  }).refine((data)=> data.password === data.confirmPassword,{
    message:"Password does not match",
    path:["confirmPassword"]
  });

  // Call useForm hook
  const { register, handleSubmit, formState:{ errors } } = useForm<FormData>({resolver:zodResolver(schema)});

  // Check validation before handleSubmit function is called
  const submitData = (data:FormData)=>{
    console.log(data);
    
  }

  return (
    <>
     <form onSubmit={handleSubmit(submitData)}>
      <h2>Sign Up Here</h2>

      <label>First Name:</label>
      <input type='text' placeholder='Joe..' {...register("firstname")} />
      {errors.firstname && <span style={{color:"red"}}>{errors.firstname.message}</span>}

      <label>First Name:</label>
      <input type='text' placeholder='Joe..' {...register("secondname")} />
      {errors.secondname && <span style={{color:"red"}}>{errors.secondname.message}</span>}

      <label>Email:</label>
      <input type='email' placeholder='someone@gmail.com'  {...register("email")} />
      {errors.email && <span style={{color:"red"}}>{errors.email.message}</span>}

      <label>Age:</label>
      <input type='number' placeholder='47 years'  {...register("age",{ valueAsNumber:true})} />
      {errors.age && <span style={{color:"red"}}>{errors.age.message}</span>}

      <label>Password:</label>
      <input type='password' placeholder='Password'  {...register("password")} />
      {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}

      <label>Repeat Password:</label>
      <input type='password' placeholder='Repeat password'  {...register("confirmPassword")}/>
      {errors.confirmPassword && <span style={{color:"red"}}>{errors.confirmPassword.message}</span>}

      <input type='submit'/>

    </form>
    

    </>
  )
}

export default App
