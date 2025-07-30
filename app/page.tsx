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
      image: "/api/placeholder/150/150",
      color: "bg-emerald-100",
    },
    {
      title: "Accessories",
      description:
        "Enhance your equipment with essential accessories and tools",
      image: "/api/placeholder/150/150",
      color: "bg-cyan-100",
    },
    {
      title: "Supplies",
      description: "Premium supplies for smooth operations and optimal control",
      image: "/api/placeholder/150/150",
      color: "bg-blue-100",
    },
    {
      title: "Parts",
      description: "Genuine parts to maintain peak performance standards",
      image: "/api/placeholder/150/150",
      color: "bg-teal-100",
    },
  ];

  const featuredProducts = [
    {
      title: "Advanced X-Ray System",
      description: "Cutting-edge technology for superior imaging",
      image: "/api/placeholder/250/200",
      price: "$45,000",
    },
    {
      title: "High-Resolution Ultrasound Machine",
      description: "Crystal clear images for accurate diagnosis",
      image: "/api/placeholder/250/200",
      price: "$32,000",
    },
    {
      title: "Portable C-Arm System",
      description: "Flexible imaging for various settings",
      image: "/api/placeholder/250/200",
      price: "$28,000",
    },
  ];

  const newArrivals = [
    {
      title: "Latest MRI Scanner",
      description: "Enhanced patient comfort and faster scan times",
      image: "/api/placeholder/200/150",
    },
    {
      title: "Digital Mammography System",
      description: "Superior image quality for early detection",
      image: "/api/placeholder/200/150",
    },
    {
      title: "Bone Densitometer",
      description: "Accurate assessment of bone health",
      image: "/api/placeholder/200/150",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Amelia Chen",
      role: "Radiologist",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      text: "MedSource has been an invaluable partner for our clinic. Their equipment is top-notch, and their customer service is exceptional. We highly recommend them!",
    },
    {
      name: "Dr. Benjamin Carter",
      role: "Cardiologist",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      text: "We've been using MedSource equipment for years, and it has consistently met our high standards. Their team is knowledgeable and responsive, making them a pleasure to work with.",
    },
    {
      name: "Dr. Olivia Davis",
      role: "Orthopedist",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      text: "MedSource provides reliable equipment and excellent support. When we had a minor issue with a recent order, their team quickly resolved it to our satisfaction.",
    },
  ];

  const partners = [
    { name: "Partner 1", logo: "/api/placeholder/120/60" },
    { name: "Partner 2", logo: "/api/placeholder/120/60" },
    { name: "Partner 3", logo: "/api/placeholder/120/60" },
    { name: "Partner 4", logo: "/api/placeholder/120/60" },
    { name: "Partner 5", logo: "/api/placeholder/120/60" },
    { name: "Partner 6", logo: "/api/placeholder/120/60" },
  ];

  const certifications = [
    { name: "ISO Certification", logo: "/api/placeholder/150/100" },
    { name: "FDA Approved", logo: "/api/placeholder/150/100" },
    { name: "Quality Assurance", logo: "/api/placeholder/150/100" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="h-[500px] bg-cover bg-center flex items-center justify-center rounded-xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/api/placeholder/800/500')",
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
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width="100%"
                    height={200}
                    className="object-cover"
                  />
                </CardHeader>
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-default-600 mb-4">{product.description}</p>
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
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width="100%"
                    height={200}
                    className="object-cover"
                  />
                </CardHeader>
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-default-600">{product.description}</p>
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
                <div className="bg-white p-8 rounded-lg shadow-md mb-4">
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={120}
                    height={80}
                    className="mx-auto"
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
