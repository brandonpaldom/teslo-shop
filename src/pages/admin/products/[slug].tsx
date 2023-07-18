import { tesloApi } from '@/api'
import { AdminLayout } from '@/components/layouts'
import { dbProducts } from '@/database'
import { ProductInterface } from '@/interfaces'
import { Product } from '@/models'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const validGenders = ['men', 'women', 'kid', 'unisex']

interface Props {
  product: ProductInterface
}

interface Inputs {
  _id?: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: string[]
  slug: string
  tags: string[]
  title: string
  type: string
  gender: string
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<Inputs>({ defaultValues: product })

  const [tags, setTags] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const suscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const slug = value.title?.toLowerCase().trim().replace(/\s+/g, '_').replace(/'/g, '') || ''
        setValue('slug', slug, { shouldValidate: true })
      }
    })

    return () => suscription.unsubscribe()
  }, [watch, setValue])

  const onChangeSize = (size: string) => {
    const sizes = getValues('sizes')
    if (sizes.includes(size)) {
      return setValue(
        'sizes',
        sizes.filter((s) => s !== size),
        { shouldValidate: true }
      )
    }
    return setValue('sizes', [...sizes, size], { shouldValidate: true })
  }

  const handleAddTag = () => {
    const tag = tags.trim().toLocaleLowerCase()
    setTags('')
    const currentTags = getValues('tags')

    if (currentTags.includes(tag)) {
      return
    }

    currentTags.push(tag)
  }

  const handleDeleteTag = (tag: string) => {
    const currentTags = getValues('tags')

    setValue(
      'tags',
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    )
  }

  const handleUploadImages = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return
    }

    try {
      for (const file of target.files) {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await tesloApi.post<{ message: string }>('/admin/upload', formData)
        setValue('images', [...getValues('images'), data.message], { shouldValidate: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    )
  }

  const onSubmitProduct = async (form: Inputs) => {
    if (form.images.length < 2) {
      return
    }

    setIsSaving(true)

    try {
      const { data } = await tesloApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      })

      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`)
      } else {
        setIsSaving(false)
      }
    } catch (error) {
      console.log(error)
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout title={`${product.title} | Teslo`}>
      <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Edit Product
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mt: 2, mb: 4 }}>
          {product.title}
        </Typography>
        <Box sx={{ maxWidth: '768px' }}>
          <form onSubmit={handleSubmit(onSubmitProduct)} noValidate>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="secondary" startIcon={<SaveIcon />} type="submit" disabled={isSaving}>
                Save
              </Button>
            </Box>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TextField
                  type="text"
                  label="Title"
                  variant="filled"
                  fullWidth
                  {...register('title', {
                    required: true,
                    minLength: {
                      value: 2,
                      message: 'Title must be at least 2 characters long.',
                    },
                  })}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
                <TextField
                  type="text"
                  label="Description"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description', {
                    required: true,
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters long.',
                    },
                  })}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
                <TextField
                  type="number"
                  label="Stock"
                  variant="filled"
                  fullWidth
                  {...register('inStock', {
                    required: true,
                    min: {
                      value: 0,
                      message: 'Stock must be at least 0.',
                    },
                  })}
                  error={Boolean(errors.inStock)}
                  helperText={errors.inStock?.message}
                />
                <TextField
                  type="number"
                  label="Price"
                  variant="filled"
                  fullWidth
                  {...register('price', {
                    required: true,
                    min: {
                      value: 0,
                      message: 'Price must be at least 0.',
                    },
                  })}
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                />
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <RadioGroup
                    row
                    value={getValues('type')}
                    onChange={(e) => {
                      setValue('type', e.target.value, { shouldValidate: true })
                    }}
                  >
                    {validTypes.map((type) => (
                      <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    value={getValues('gender')}
                    onChange={(e) => {
                      setValue('gender', e.target.value, { shouldValidate: true })
                    }}
                  >
                    {validGenders.map((gender) => (
                      <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Sizes</FormLabel>
                  <FormGroup row>
                    {validSizes.map((size) => (
                      <FormControlLabel
                        key={size}
                        control={<Checkbox checked={getValues('sizes').includes(size)} />}
                        label={size}
                        onChange={() => onChangeSize(size)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TextField
                  type="text"
                  label="Slug"
                  variant="filled"
                  fullWidth
                  {...register('slug', {
                    required: 'Slug is required.',
                    validate: (value) => !/\s/.test(value) || 'Slug cannot contain spaces.',
                  })}
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message}
                />
                <TextField
                  type="text"
                  label="Tags"
                  variant="filled"
                  fullWidth
                  helperText="Press space to add tag"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  onKeyDown={(e) => e.key === ' ' && handleAddTag()}
                />
                <Box>
                  {getValues('tags').map((tag) => (
                    <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} color="primary" onDelete={() => handleDeleteTag(tag)} />
                  ))}
                  <Divider />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormLabel>Images</FormLabel>
                  <Button variant="contained" color="secondary" startIcon={<FileUploadIcon />} onClick={() => fileInputRef.current?.click()}>
                    Upload
                  </Button>
                  <input type="file" multiple accept="image/jpg, image/png" hidden ref={fileInputRef} onChange={handleUploadImages} />
                  <Alert severity="warning" sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}>
                    It is required to have at least two images.
                  </Alert>
                  <Grid container spacing={2}>
                    {getValues('images').map((image) => (
                      <Grid item key={image} xs={4}>
                        <Card>
                          <CardMedia component="img" image={image} alt={product.title} />
                          <CardActions>
                            <Button size="small" color="error" onClick={() => handleDeleteImage(image)}>
                              Delete
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query
  let product: ProductInterface | null = null

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()))
    delete tempProduct._id
    tempProduct.images = []
    product = tempProduct
  } else {
    product = await dbProducts.getProductBySlug(slug as string)
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
  }
}
