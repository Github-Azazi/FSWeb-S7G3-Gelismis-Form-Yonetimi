import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";



const validationSchema = yup.object().shape({
  name: yup.string().required("İsim zorunludur"), 
  email: yup.string().email("Geçerli bir email adresi giriniz").required("Email zorunludur").notOneOf(["waffle@syrup.com"], "Bu email adresi daha önce eklendi"), 
  password: yup.string().required("Şifre zorunludur"), 
  terms: yup.boolean().oneOf([true], "Kullanım şartlarını kabul etmelisiniz"), 
  role: yup.string().required("Rol zorunludur"), 
  age: yup.number().min(18, "18 yaşından büyük olmalısınız").required("Yaş zorunludur"), 
  city: yup.string().required("Şehir zorunludur"), 
  education: yup.string().required("Eğitim zorunludur"), 
});


const Form = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [role, setRole] = useState(""); 
  const [age, setAge] = useState(""); 
  const [city, setCity] = useState("");
  const [education, setEducation] = useState(""); 

  
  const [errors, setErrors] = useState({});

  
  const [users, setUsers] = useState([]);

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      
      await validationSchema.validate({ name, email, password, terms, role, age, city, education }, { abortEarly: false });
      setErrors({}); 

      
      const response = await axios.post("https://reqres.in/api/users", { name, email, password, role, age, city, education });
      console.log(response.data); 

      
      setUsers([...users, response.data]);

     
      setName("");
      setEmail("");
      setPassword("");
      setTerms(false);
      setRole("");
      setAge("");
      setCity("");
      setEducation("");
    } catch (err) {
      
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  
  return (
<div className="container mx-auto p-10 bg-gray-100">
  <form onSubmit={handleSubmit} className="form"> 
    <div className="form-group"> 
      <label className="block text-gray-700 font-bold mb-2">İsim:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> 
      {errors.name && <span className="error text-red-500 text-xs italic">{errors.name}</span>} 
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      {errors.email && <span className="error text-red-500 text-xs italic">{errors.email}</span>}
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">Şifre:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      {errors.password && <span className="error text-red-500 text-xs italic">{errors.password}</span>}
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">
        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="form-check-input mr-2 leading-tight" />
        Kullanım Şartları
      </label>
      {errors.terms && <span className="error text-red-500 text-xs italic">{errors.terms}</span>}
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">Rol:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"> 
        <option value="">Rol seçiniz</option> 
        <option value="admin">Admin</option> 
        <option value="user">User</option> 
        <option value="guest">Guest</option> 
      </select>
      {errors.role && <span className="error text-red-500 text-xs italic">{errors.role}</span>}
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">Yaş:</label>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> 
      {errors.age && <span className="error text-red-500 text-xs italic">{errors.age}</span>}
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">Şehir:</label>
      <select value={city} onChange={(e) => setCity(e.target.value)} className="form-select block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"> 
        <option value="">Yaşadığınız Şehri seçiniz</option> 
        <option value="istanbul">İstanbul</option> 
        <option value="ankara">Ankara</option> 
        <option value="izmir">İzmir</option> 
        <option value="antalya">Antalya</option>
        <option value="diğer">Diğer</option>
      </select>
      {errors.city && <span className="error text-red-500 text-xs italic">{errors.city}</span>}
    </div>
    <div className="form-group">
      <label className="block text-gray-700 font-bold mb-2">Eğitim:</label>
      <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> 
      {errors.education && <span className="error text-red-500 text-xs italic">{errors.education}</span>}
    </div>
    <button type="submit" className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Gönder</button> 
  </form>


  <h2 className="text-center text-blue-700 font-bold text-2xl">Kullanıcılar</h2>
{users.map((user, index) => ( 
  <pre key={index} className="p-5 border border-gray-200 rounded bg-white font-mono text-sm overflow-x-auto">{
    JSON.stringify(user, null, 2)}</pre>
    ))}
    </div>
  );
};


export default Form;



