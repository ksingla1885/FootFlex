import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminNavbar from '../../components/layout/AdminNavbar';
import Footer from '../../components/layout/Footer';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/layout/Loader';


const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: var(--background-dark);
  padding: 3rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
`;

const ProductSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const ProductForm = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(13, 71, 161, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(13, 71, 161, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(13, 71, 161, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 2}, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const SizesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const SizeItem = styled.div`
  background-color: var(--background-dark);
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SizeText = styled.div`
  font-weight: 500;
`;

const RemoveButton = styled.button`
  color: var(--error-color);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    color: #b71c1c;
  }
`;

const ColorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ColorItem = styled.div`
  background-color: var(--background-dark);
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ColorSwatch = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid #ccc;
`;

const ImageUploader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--error-color);
  
  &:hover {
    background-color: white;
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Men',
    description: '',
    price: '',
  });
  
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState('');
  const [stockInput, setStockInput] = useState('');
  
  const [colors, setColors] = useState([]);
  const [colorNameInput, setColorNameInput] = useState('');
  const [colorHexInput, setColorHexInput] = useState('#000000');
  
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        const { data } = await axios.get(`/api/products/${id}`, config);
        
        setFormData({
          name: data.name,
          brand: data.brand,
          category: data.category,
          description: data.description,
          price: data.price,
        });
        
        setSizes(data.sizes);
        setColors(data.colors);
        setImages(data.images);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error fetching product details');
        setLoading(false);
        navigate('/admin/products');
      }
    };
    
    fetchProduct();
  }, [id, userInfo.token, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleAddSize = () => {
    if (sizeInput.trim() !== '' && stockInput.trim() !== '') {
      setSizes([
        ...sizes,
        {
          size: sizeInput,
          countInStock: parseInt(stockInput),
        },
      ]);
      setSizeInput('');
      setStockInput('');
    }
  };
  
  const handleRemoveSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };
  
  const handleAddColor = () => {
    if (colorNameInput.trim() !== '' && colorHexInput.trim() !== '') {
      setColors([
        ...colors,
        {
          name: colorNameInput,
          hex: colorHexInput,
        },
      ]);
      setColorNameInput('');
      setColorHexInput('#000000');
    }
  };
  
  const handleRemoveColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };
  
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    try {
      setUploading(true);
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.post('/api/products/upload', formData, config);
      
      setImages([...images, ...data]);
      setUploading(false);
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
      toast.error('Error uploading images');
    }
  };
  
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      !formData.name ||
      !formData.brand ||
      !formData.category ||
      !formData.description ||
      !formData.price ||
      sizes.length === 0 ||
      colors.length === 0 ||
      images.length === 0
    ) {
      toast.error('Please fill in all fields and add at least one size, color, and image');
      return;
    }
    
    try {
      setUpdateLoading(true);
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sizes,
        colors,
        images,
      };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      await axios.put(`/api/products/${id}`, productData, config);
      
      setUpdateLoading(false);
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setUpdateLoading(false);
      toast.error('Error updating product');
    }
  };
  
  if (loading) {
    return (
      <PageContainer>
        <AdminNavbar />
        <ProductSection>
          <Loader fullScreen />
        </ProductSection>
        <Footer />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <AdminNavbar />
      
      <Header>
        <HeaderContent>
          <BackLink to="/admin/products">
            <FaArrowLeft /> Back to Products
          </BackLink>
          <Title>Edit Product</Title>
        </HeaderContent>
      </Header>
      
      <ProductSection>
        <ProductForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            
            <FormGroup>
              <FormLabel htmlFor="name">Product Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="brand">Brand</FormLabel>
                <FormInput
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="category">Category</FormLabel>
                <FormSelect
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="price">Price ($)</FormLabel>
                <FormInput
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormTextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Sizes & Inventory</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="size">Size</FormLabel>
                <FormInput
                  type="text"
                  id="size"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  placeholder="e.g. 8, 9, 10"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="stock">Count in Stock</FormLabel>
                <FormInput
                  type="number"
                  id="stock"
                  value={stockInput}
                  onChange={(e) => setStockInput(e.target.value)}
                  min="0"
                  placeholder="e.g. 10"
                />
              </FormGroup>
            </FormRow>
            
            <AddButton type="button" onClick={handleAddSize}>
              <FaPlus /> Add Size
            </AddButton>
            
            <SizesList>
              {sizes.map((size, index) => (
                <SizeItem key={index}>
                  <SizeText>
                    {size.size} - {size.countInStock} in stock
                  </SizeText>
                  <RemoveButton type="button" onClick={() => handleRemoveSize(index)}>
                    <FaTrash />
                  </RemoveButton>
                </SizeItem>
              ))}
            </SizesList>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Colors</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="colorName">Color Name</FormLabel>
                <FormInput
                  type="text"
                  id="colorName"
                  value={colorNameInput}
                  onChange={(e) => setColorNameInput(e.target.value)}
                  placeholder="e.g. Red, Blue, Black"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="colorHex">Color Code</FormLabel>
                <FormInput
                  type="color"
                  id="colorHex"
                  value={colorHexInput}
                  onChange={(e) => setColorHexInput(e.target.value)}
                />
              </FormGroup>
            </FormRow>
            
            <AddButton type="button" onClick={handleAddColor}>
              <FaPlus /> Add Color
            </AddButton>
            
            <ColorsList>
              {colors.map((color, index) => (
                <ColorItem key={index}>
                  <ColorSwatch color={color.hex} />
                  <SizeText>{color.name}</SizeText>
                  <RemoveButton type="button" onClick={() => handleRemoveColor(index)}>
                    <FaTrash />
                  </RemoveButton>
                </ColorItem>
              ))}
            </ColorsList>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Product Images</SectionTitle>
            
            <FormGroup>
              <FormLabel htmlFor="images">Upload Images</FormLabel>
              <FormInput
                type="file"
                id="images"
                onChange={handleImageUpload}
                multiple
                accept="image/*"
              />
              {uploading && <Loader size={30} />}
            </FormGroup>
            
            <ImageUploader>
              <ImagePreviewContainer>
                {images.map((image, index) => (
                  <ImagePreview key={index}>
                    <img src={image} alt={`Product ${index}`} />
                    <RemoveImageButton
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash />
                    </RemoveImageButton>
                  </ImagePreview>
                ))}
              </ImagePreviewContainer>
            </ImageUploader>
          </FormSection>
          
          <SubmitButton
            type="submit"
            disabled={updateLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {updateLoading ? <Loader size={24} /> : 'Update Product'}
          </SubmitButton>
        </ProductForm>
      </ProductSection>
      
      <Footer />
    </PageContainer>
  );
};

export default ProductEdit;