import React, { useEffect ,useState} from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/ThemeSelector.css';

export default function NomineeRelation(){

    const [nomineeRelation,SetnomineeRelation] = useState([]);
    const [SelectedType,SetSelectedType] = useState([]);

    const InitState = {
        Status:null,
        StatusRef:null,
    }
    const [Details,setDetails] =useState(InitState);

    const handleChange = (e) =>{
      const { name, value } = e.target;
      const pattern = /[^a-zA-Z ]/g;
      let result = pattern.test(value);
      if(result){
            setDetails({
              ...Details,
              [name]: value.replace(pattern,'').toUpperCase()
            });
            
      }else{
      setDetails({
        ...Details,
        [name]: value.toUpperCase()
      });
    }
    }


const handleUpdate = (e) => {
  const { name, value } = e.target;
  const pattern = /[^a-zA-Z ]/g;
let result = pattern.test(value);
if(result){
  SetSelectedType({
    ...SelectedType,
    [name]: value.replace(pattern,'').toUpperCase()
  });
  
}else{ 
  SetSelectedType({
    ...SelectedType,
    [name]: value.toUpperCase()
});
}
}

    const handleEdit = (items) => {
        const InitStateEdit = {
          Id:items.Id,
          Status:items.Status,
          StatusRef:items.Status_Ref
      }
        SetSelectedType(InitStateEdit);
        //console.log(InitStateEdit);
    };

    const fetchnomineeRelation = async () => {
    try {
    //  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/FetchnomineeRelation`,{ withCredentials: true});
      //console.log("Fetched data:", response.data);// Log the fetched data
   //   SetnomineeRelation(response.data);
      } catch(error){
      //  if(error.response && error.response.status !==200)
    //      FailedMSG('Something went Wrong');
      }
    };
/*
useEffect(()=>{
    fetchnomineeRelation();
},[]);
  
    
    const UpdateForm = (event) => {
        event.preventDefault();
        try{
           axios.post(`${process.env.REACT_APP_API_BASE_URL}/UpdatenomineeRelation`,SelectedType)
           .then((res)=>{SuccessMSG(res.data.message);SetSelectedType([]);fetchnomineeRelation();}).catch((err)=> { 
            if(err.response && err.response.status !==200)
              FailedMSG('Something went Wrong');});
        event.target.reset();
        }catch(error){
          if(error.response && error.response.status !==200)
            FailedMSG('Something went Wrong');
        }
      };
    
    const handleDelete =(items) =>{
      try{
         axios.post(`${process.env.REACT_APP_API_BASE_URL}/DeletenomineeRelation`,items)
         .then((res)=>{SuccessMSG(res.data.message);fetchnomineeRelation();}).catch((err)=> {   
          if(err.response && err.response.status !==200) FailedMSG('Something went Wrong')
          });
        }catch(error){
          if(error.response && error.response.status !==200)
            FailedMSG('Something went Wrong');
        }
    }

    const handleSubmit =  (event) =>{
        event.preventDefault();
        //console.log(Details);  
        try{
           axios.post(`${process.env.REACT_APP_API_BASE_URL}/AddnomineeRelation`,Details)
           .then((res)=> { 
            if(res.status === 200){SuccessMSG(res.data.message);}
            if(res.status === 201){ WarningMSG(res.data.message);}
            setDetails([]);fetchnomineeRelation();}
          ).catch((err)=> { 
            if(err.response && err.response.status !==200) FailedMSG('Something went Wrong')});
          event.target.reset();
        }catch(error){
          if(error.response && error.response.status !==200)
            FailedMSG('Something went Wrong');
        }
    }

    */

    return(
    <>
    <div className="MSContainer">
        <div className="MSContainerChild">
            <p className="MSCHead">Nominee Relation</p>
            <form className="MSForm" >
                <div className="MSFormInputs">
                <input className="MSFormInput1" type="text"  name="Relation"  placeholder="Enter Relation" required></input>
                <input className="MSFormInput1" type="text"  name="RelationRef" placeholder="Ref Relation" required></input>
                </div>
                <button className="MSFormSubmitBtn" type="submit">Save</button>
            </form>
        </div>
        <div className="MSContainerChild1">
            <div className="MSCTHeads">
                <p className="MSCTHLabels">Relation</p>
                <p className="MSCTHLabels">Ref Relation</p>
                <div className="MSCTBtns">
                </div>
            </div>
            {nomineeRelation.length <1 ? <p> No Relation Found</p>:
                nomineeRelation.map((items)=>{
                    return <div className="MSCTiles">
                    <p className="MSCTLabels">{items.Type}</p>
                    <p className="MSCTLabels">{items.Type_Ref}</p>
                    <div className="MSCTBtns">
                    <FontAwesomeIcon className='MSCTEditIcon' title='Edit' onClick={()=>handleEdit(items)} icon={faEdit}></FontAwesomeIcon>
                    </div>
                    </div>
                })}
        </div>
    </div>
    </>);
}


//<FontAwesomeIcon className='MSCTDeleteIcon' title='Delete' onClick={()=>handleDelete(items)} icon={faTrash}></FontAwesomeIcon>