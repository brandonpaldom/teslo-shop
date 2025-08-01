import bcryptjs from 'bcryptjs';

export const ProductSize = {
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL',
  XXXL: 'XXXL',
} as const;

export type ProductSize = (typeof ProductSize)[keyof typeof ProductSize];

export const ProductGender = {
  MEN: 'men',
  WOMEN: 'women',
  KIDS: 'kids',
} as const;

export type ProductGender = (typeof ProductGender)[keyof typeof ProductGender];

export const ProductCategory = {
  TEE: 'tee',
  HOODIE: 'hoodie',
  SWEATSHIRT: 'sweatshirt',
  JACKET: 'jacket',
  HAT: 'hat',
  BEANIE: 'beanie',
  SOCKS: 'socks',
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

export interface ProductSeedData {
  id?: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  slug: string;
  size: ProductSize[];
  gender: ProductGender;
  category: ProductCategory;
  images: string[];
  tags: string[];
}

export interface UserSeedData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface CountrySeedData {
  id: string;
  name: string;
}

export interface SeedData {
  users: UserSeedData[];
  categories: { name: ProductCategory }[];
  products: ProductSeedData[];
  countries: CountrySeedData[];
}

export const initialData: SeedData = {
  users: [
    {
      name: 'Admin',
      email: 'admin@mail.com',
      password: bcryptjs.hashSync('12345678', 10),
      role: 'admin',
    },
    {
      name: 'Client',
      email: 'client@mail.com',
      password: bcryptjs.hashSync('12345678', 10),
      role: 'user',
    },
  ],
  categories: [
    { name: ProductCategory.TEE },
    { name: ProductCategory.HOODIE },
    { name: ProductCategory.SWEATSHIRT },
    { name: ProductCategory.JACKET },
    { name: ProductCategory.HAT },
    { name: ProductCategory.BEANIE },
    { name: ProductCategory.SOCKS },
  ],
  products: [
    {
      name: "Men's Model S/X Plaid Tee",
      price: 40,
      description:
        'A comfortable and stylish tee inspired by the Tesla Model S/X Plaid.',
      stock: 10,
      slug: 'mens-model-s-x-plaid-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2151910-01-A-1.jpg',
        '2151910-01-A-2.jpg',
        '2151910-01-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Model 3 Performance Tee",
      price: 40,
      description: 'A high-performance tee designed for comfort and style.',
      stock: 10,
      slug: 'mens-model-3-performance-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2151616-01-A-1.jpg',
        '2151616-01-A-2.jpg',
        '2151616-01-A-3.jpg',
        '2151616-01-A-4.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Cybercab Tee",
      price: 40,
      description: 'A futuristic tee inspired by the Tesla Cybercab.',
      stock: 10,
      slug: 'mens-cybercab-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2151594-01-A-1.jpg',
        '2151594-01-A-2.jpg',
        '2151594-01-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Tesla Optimus Tee",
      price: 40,
      description: 'A sleek tee inspired by the Tesla Optimus robot.',
      stock: 10,
      slug: 'mens-tesla-optimus-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2151433-01-A-1.jpg',
        '2151433-01-A-2.jpg',
        '2151433-01-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Built for Any Planet Tee",
      price: 40,
      description: 'A tee designed for any planet in the galaxy.',
      stock: 10,
      slug: 'mens-built-for-any-planet-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2076542-01-A-1.jpg',
        '2076542-01-A-2.jpg',
        '2076542-01-A-3.jpg',
        '2076542-01-A-4.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Foundation Series Tee",
      price: 40,
      description: 'A tee inspired by the Tesla Foundation Series.',
      stock: 10,
      slug: 'mens-foundation-series-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2076543-00-A-1.jpg',
        '2076543-00-A-2.jpg',
        '2076543-00-A-3.jpg',
        '2076543-00-A-4.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Cybertruck Cityscape Tee",
      price: 45,
      description: 'A tee featuring a Cybertruck cityscape design.',
      stock: 10,
      slug: 'mens-cybertruck-cityscape-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2024512-00-A-1.jpg',
        '2024512-00-A-2.jpg',
        '2024512-00-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Cybertruck Foundation Tee",
      price: 40,
      description: 'A tee inspired by the Tesla Cybertruck Foundation.',
      stock: 10,
      slug: 'mens-cybertruck-foundation-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2058347-00-A-1.jpg',
        '2058347-00-A-2.jpg',
        '2058347-00-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Cybertruck Reflective Tee",
      price: 35,
      description: 'A reflective tee inspired by the Tesla Cybertruck.',
      stock: 10,
      slug: 'mens-cybertruck-reflective-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '2030199-00-A-1.jpg',
        '2030199-00-A-2.jpg',
        '2030199-00-A-3.jpg',
        '2030199-00-A-4.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Cybertruck Horizon Tee",
      price: 35,
      description: 'A tee inspired by the Tesla Cybertruck Horizon.',
      stock: 10,
      slug: 'mens-cybertruck-horizon-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '1932713-00-A-1.jpg',
        '1932713-00-A-2.jpg',
        '1932713-00-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Cybertruck Owl Tee",
      price: 35,
      description: 'A tee featuring a Cybertruck owl design.',
      stock: 10,
      slug: 'mens-cybertruck-owl-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '7654394-00-A-1.jpg',
        '7654394-00-A-2.jpg',
        '7654394-00-A-3.jpg',
        '7654394-00-A-4.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's Powerwall Tee",
      price: 20,
      description: 'A tee inspired by the Tesla Powerwall.',
      stock: 10,
      slug: 'mens-powerwall-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '9877034-00-A-1.jpg',
        '9877034-00-A-2.jpg',
        '9877034-00-A-3.jpg',
      ],
      tags: [''],
    },
    {
      name: "Men's 3D Large Wordmark Tee",
      price: 15,
      description: 'A tee featuring a large Tesla wordmark.',
      stock: 10,
      slug: 'mens-3d-large-wordmark-tee',
      size: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.XL,
        ProductSize.XXL,
        ProductSize.XXXL,
      ],
      gender: ProductGender.MEN,
      category: ProductCategory.TEE,
      images: [
        '8764741-00-A-1.jpg',
        '8764741-00-A-2.jpg',
        '8764741-00-A-3.jpg',
      ],
      tags: [''],
    },
  ],
  countries: [
    {
      id: 'US',
      name: 'United States',
    },
    {
      id: 'CA',
      name: 'Canada',
    },
    {
      id: 'MX',
      name: 'Mexico',
    },
  ],
};
