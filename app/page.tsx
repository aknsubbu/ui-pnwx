import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";

import { SearchIcon } from "@/components/icons";

const MedSourcePage = () => {
  const categories = [
    {
      title: "Equipment",
      description: "Advanced imaging systems for precise medical diagnostics",
      image: "/Depth 7, Frame 0.png",
      color: "bg-emerald-100",
    },
    {
      title: "Accessories",
      description:
        "Enhance your equipment with essential accessories and tools",
      image: "/Depth 7, Frame 1.png",
      color: "bg-cyan-100",
    },
    {
      title: "Supplies",
      description: "Premium supplies for smooth operations and optimal control",
      image: "/Depth 7, Frame 2.png",
      color: "bg-blue-100",
    },
    {
      title: "Parts",
      description: "Genuine parts to maintain peak performance standards",
      image: "/Depth 7, Frame 3.png",
      color: "bg-teal-100",
    },
  ];

  const featuredProducts = [
    {
      title: "Medium MRI phantom",
      description: " ACR accredited phantoms optimized for time efficiency",
      image:
        "https://www.pnwx.com/Accessories/Phantoms/MRI/Pro-Project/ACR-Medium/09-301_1.jpg",
      price: "$2,675",
    },
    {
      title: "Lead-free X-Ray Apron",
      description: "Fastest Shipping Lead Apparel",
      image:
        "https://www.pnwx.com/Accessories/LeadProducts/Aprons/Infab/LightningFast/UFP_1.jpg",
      price: "$895",
    },
    {
      title: "Veterinary Immobilizers",
      description: "Premium radiolucent small animal immobilizers",
      image: "https://www.pnwx.com/Accessories/PosAides/Pet-Sitioner/PSL_1.jpg",
      price: "$240",
    },
  ];

  const newArrivals = [
    {
      title: "R/F QC Phantom",
      description:
        "Accurate, easy-to-use tool for evaluating the image quality",
      image:
        "https://www.pnwx.com/Accessories/Phantoms/Test/Fluoroscopy/07-647_1.jpg",
    },
    {
      title: "X-Ray Grids",
      description: "..with superior construction",
      image: "https://www.pnwx.com/Parts/Grids/11432_1.jpg",
    },
    {
      title: "Radiation Reducing Gloves",
      description: "Exam and Surgical Radiation Reducing Gloves built for dexterity and comfort",
      image:
        "https://www.pnwx.com/Accessories/LeadProducts/Gloves/Proguard/RR1_1.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Amelia Chen",
      role: "Radiologist",
      avatar: "/Depth 7, Frame 10.png",
      rating: 5,
      text: "MedSource has been an invaluable partner for our clinic. Their equipment is top-notch, and their customer service is exceptional. We highly recommend them!",
    },
    {
      name: "Dr. Benjamin Carter",
      role: "Cardiologist",
      avatar: "/Depth 7, Frame 11.png",
      rating: 5,
      text: "We've been using MedSource equipment for years, and it has consistently met our high standards. Their team is knowledgeable and responsive, making them a pleasure to work with.",
    },
    {
      name: "Dr. Olivia Davis",
      role: "Orthopedist",
      avatar: "/Depth 7, Frame 12.png",
      rating: 5,
      text: "MedSource provides reliable equipment and excellent support. When we had a minor issue with a recent order, their team quickly resolved it to our satisfaction.",
    },
  ];

  const partners = [
    { name: "Partner 1", logo: "/Depth 7, Frame 13.png" },
    { name: "Partner 2", logo: "/Depth 7, Frame 14.png" },
    { name: "Partner 3", logo: "/Depth 7, Frame 19.png" },
    { name: "Partner 4", logo: "/Depth 7, Frame 20.png" },
    { name: "Partner 5", logo: "/Depth 7, Frame 21.png" },
    { name: "Partner 6", logo: "/Depth 6, Frame 0.png" },
  ];

  const certifications = [
    {
      name: "ISO Certification",
      logo: "https://www.fdiworlddental.org/sites/default/files/styles/ino_plain_1x_xs/public/2021-05/ISO%20logo%20copie.png?itok=_YwGJWNy",
    },
    {
      name: "FDA Approved",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLGbW32p4xWTiioDa_PzEOrIB_pp9-UoHUQ&s",
    },
    {
      name: "Quality Assurance",
      logo: "https://cdn-icons-png.flaticon.com/512/5988/5988354.png",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="h-[500px] bg-cover bg-center flex items-center justify-center rounded-xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/Depth 7, Frame 0.png')",
          }}
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">
              Your Trusted Partner in Medical
              <br />
              Imaging Solutions
            </h1>
            <p className="text-xl mb-8 opacity-90">
              For over 20 years, we have provided advanced high-quality
              radiology equipment, accessories, supplies, and parts. We provide
              comprehensive solutions tailored to your specific needs, ensuring
              optimal performance and patient care.
            </p>
            <div className="flex gap-4 justify-center items-center max-w-md mx-auto">
              <Input
                placeholder="Search 6,800+ Products"
                startContent={<SearchIcon className="text-default-100" />}
                className="flex-1"
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white",
                }}
              />
              <Button color="primary" size="lg">
                SEARCH
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <CardBody className="text-center">
                  <div
                    className={`w-24 h-24 ${category.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-default-600 text-sm">
                    {category.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6 bg-default-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="p-0">
                  <div 
                    className="w-full h-[200px] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </CardHeader>
                <CardBody className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-default-600 mb-4 flex-1">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <Button color="primary" variant="flat">
                      Learn More
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="p-0">
                  <div 
                    className="w-full h-[200px] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </CardHeader>
                <CardBody className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-default-600 mb-4 flex-1">{product.description}</p>
                  <div className="flex justify-end">
                    <Button color="primary" variant="flat">
                      Learn More
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-default-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardBody>
                  <div className="flex items-center mb-4">
                    <Avatar src={testimonial.avatar} className="mr-3" />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-default-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-warning fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-default-700 italic">
                    "{testimonial.text}"
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Trusted Partners Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Trusted Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-default-100 rounded-lg"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={50}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 px-6 bg-default-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md mb-4 h-24 w-32 mx-auto flex items-center justify-center">
                  <div 
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${cert.logo})` }}
                  />
                </div>
                <h3 className="font-bold">{cert.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold text-default-600 mb-2">
                Years of Experience
              </h3>
              <p className="text-4xl font-bold text-primary">20+</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-default-600 mb-2">
                Products Offered
              </h3>
              <p className="text-4xl font-bold text-primary">6,800+</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-default-600 mb-2">
                Satisfied Clients
              </h3>
              <p className="text-4xl font-bold text-primary">1,000+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default MedSourcePage;
