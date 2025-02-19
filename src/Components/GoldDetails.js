import React, { useState,useEffect } from "react";
import "../Styles/GoldDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCheck, faEdit, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";


function GoldDetails({ formData, setFormData, errors }) {
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState(1);
  const [goldData, setgoldData] = useState({
    goldName: "",
    goldType: "",
    weight: "",
    karat: "",
    hallmark: "BIS",
    appraisedValue: "",
    goldPhoto: null,
    comments: "",
  });

  // Initialize forms from formData on component mount
  useEffect(() => {
    const flattened = formData.goldDetails.flat();
    const uniqueForms = Array.from(
      new Map(flattened.map((item) => [item.id, item])).values()
    );
    setForms(uniqueForms);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setgoldData({ ...goldData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setgoldData({ ...goldData, goldPhoto: e.target.files[0] });
  };

  const handleAddForm = () => {
    if (validateForm()) {
      const formExists = forms.find((form) => form.id === goldData.id);
      let updatedForms;

      if (formExists) {
        // Update existing form
        updatedForms = forms.map((form) =>
          form.id === goldData.id ? { ...form, ...goldData } : form
        );
      } else {
        // Add new form
        const newForm = { ...goldData, id: formId };
        updatedForms = [...forms, newForm];
        setFormId(formId + 1);
      }

      setForms(updatedForms);
      setFormData({
        ...formData,
        goldDetails: updatedForms.map((form) => [form]), // Convert back to nested structure
        goldItem: updatedForms.length,
        totalGoldWeight: updatedForms.reduce(
          (sum, item) => sum + parseFloat(item.weight || 0),
          0
        ),
        totalAppraisedValue: updatedForms.reduce(
          (sum, item) => sum + parseFloat(item.appraisedValue || 0),
          0
        ),
      });
      resetForm();
    } else {
      alert("Please fill all required fields correctly.");
    }
  };

  const handleDeleteForm = (id) => {
    const updatedForms = forms.filter((form) => form.id !== id);

    setForms(updatedForms);
    setFormData({
      ...formData,
      goldDetails: updatedForms.map((form) => [form]),
      goldItem: updatedForms.length,
      totalGoldWeight: updatedForms.reduce(
        (sum, item) => sum + parseFloat(item.weight || 0),
        0
      ),
      totalAppraisedValue: updatedForms.reduce(
        (sum, item) => sum + parseFloat(item.appraisedValue || 0),
        0
      ),
    });
  };

  const handleEditForm = (id) => {
    const formToEdit = forms.find((form) => form.id === id);
    setgoldData(formToEdit);
  };

  const validateForm = () => {
    const {
      goldName,
      goldType,
      weight,
      karat,
      hallmark,
      appraisedValue,
      goldPhoto,
    } = goldData;
    return (
      goldName &&
      goldType &&
      weight &&
      !isNaN(weight) &&
      karat &&
      hallmark &&
      appraisedValue &&
      !isNaN(appraisedValue) &&
      goldPhoto
    );
  };

  const resetForm = () => {
    setgoldData({
      goldName: "",
      goldType: "",
      weight: "",
      karat: "",
      hallmark: "BIS",
      appraisedValue: "",
      goldPhoto: null,
      comments: "",
    });
  };

  return (
    <div className="gold-details-form">
      <p className="step-head-label">Gold Details</p>
      <div className="gold-details-main">
        <div className="gold-details-cards">
          <form className="gold-details-card-items-1">
            <div className="gold-select">
            <input
                className="gold-details-inputs"
                name="goldName"
                placeholder="Gold Name"
                type="text"
                value={goldData.goldName}
                onChange={handleInputChange}
              />
              <select
                className="gold-type"
                name="goldType"
                value={goldData.goldType}
                onChange={handleInputChange}
              >
                <option value="">Gold Type</option>
                <option value="With Stone">With Stone</option>
                <option value="Without Stone">Without Stone</option>
                <option value="With Gem">With Gem</option>
                <option value="Without Gem">Without Gem</option>
                <option>Add New</option>
              </select>
              <select
                className="gold-purity"
                name="karat"
                value={goldData.karat}
                onChange={handleInputChange}
              >
                <option value="">Karat</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
                <option value="24">24</option>
              </select>
              <div className="photo-upload-grp">
                <input
                  id={`goldPhoto-${formId}`}
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                  name="goldPhoto"
                  onChange={handlePhotoChange}
                />
                <label
                  htmlFor={`goldPhoto-${formId}`}
                  className="file-upload-icon"
                >
                  <i className="bi bi-upload"></i>
                </label>
              </div>
            </div>
            <div className="gold-select">
              <div className="custom-toggle">
                <div
                  className={`toggle-option ${goldData.hallmark === "BIS" ? "active" : ""}`}
                  onClick={() => setgoldData({ ...goldData, hallmark: "BIS" })}
                >
                  BIS
                </div>
                <div
                  className={`toggle-option ${goldData.hallmark === "KDM" ? "active" : ""}`}
                  onClick={() => setgoldData({ ...goldData, hallmark: "KDM" })}
                >
                  KDM
                </div>
              </div>
              <input
                className="gold-details-inputs"
                name="weight"
                placeholder="Weight (g)"
                type="number"
                value={goldData.weight}
                onChange={handleInputChange}
              />
              <input
                className="gold-details-inputs"
                name="appraisedValue"
                type="number"
                placeholder="Appraised Value"
                value={goldData.appraisedValue}
                onChange={handleInputChange}
              />
            </div>
            <input
              className="gold-details-comments"
              name="comments"
              placeholder="Comments"
              value={goldData.comments}
              onChange={handleInputChange}
            />
          </form>
          <div className="gold-details-card-items-2">
          {goldData.goldPhoto && (
            <img className="gold-photo"
              src={URL.createObjectURL(goldData.goldPhoto)}
              alt="Gold Preview"
            />
          )}
          </div>
        </div>
      </div>
      <div className="gold-grp-buttons">
      <button className="refresh-gold-button" onClick={resetForm}><FontAwesomeIcon size="lg" icon={faRefresh}></FontAwesomeIcon></button>
      <button className="done-gold-button" onClick={handleAddForm}><FontAwesomeIcon size="xl" icon={faCheck}></FontAwesomeIcon></button>
      <button className="add-gold-button" onClick={handleAddForm}><FontAwesomeIcon size="xl" icon={faAdd}></FontAwesomeIcon></button>
      </div>
        <div className="gold-details-list">
          {forms.map((form) => {
            console.log(forms);
            return <div key={form.id} className="gold-details-card">
              {form.goldPhoto && (
                <img className="gold-image"
                  src={URL.createObjectURL(form.goldPhoto)}
                  alt="Gold Preview"
                />
              )}
              <div className="gold-edit-grp-buttons">
              <button className="edit-gold-button" onClick={() => handleEditForm(form.id)}><FontAwesomeIcon size="sm" icon={faEdit}></FontAwesomeIcon></button>
              <button className="delete-gold-button"  onClick={() => handleDeleteForm(form.id)}><FontAwesomeIcon size="sm" icon={faTrash}></FontAwesomeIcon></button>
              </div>
            </div>
      })}
        </div>
      <div className="gold-detail-footer">
        <p className="gold-detail-footer-lables">
          Total Gold Items - <span className="gold-values">{formData?.goldItem ? formData.goldItem : forms.length}</span>
        </p>
        <p className="gold-detail-footer-lables">
          Total Appraised Value -
          <span className="gold-values">
            {formData?.totalAppraisedValue ? formData.totalAppraisedValue :forms.reduce((sum, item) => sum + parseFloat(item.appraisedValue || 0), 0)}
          </span>
        </p>
        <p className="gold-detail-footer-lables">
          Total Gold Weight -
          <span className="gold-values">
            {formData?.totalGoldWeight ? formData.totalGoldWeight :forms.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0)} g
          </span>
        </p>
      </div>
    </div>
  );
}

export default GoldDetails;
