
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { generatePDF } from '@/utils/pdfGenerator';

const formSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  personalMessage: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
});

type FormData = z.infer<typeof formSchema>;

const SalesPresentationGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: '',
      email: '',
      phone: '',
      companyName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      date: new Date().toISOString().split('T')[0],
      personalMessage: '',
      serviceType: '',
    },
  });

  const services = [
    { id: 'digital-marketing', name: 'Digital Marketing', price: '$2,500/month' },
    { id: 'web-development', name: 'Web Development', price: '$5,000 - $15,000' },
    { id: 'ai-solutions', name: 'AI Solutions', price: '$3,000 - $10,000' },
    { id: 'strategy-consulting', name: 'Strategy Consulting', price: '$1,500/month' },
    { id: 'social-media-management', name: 'Social Media Management', price: '$800/month' },
    { id: 'recruitment-marketing', name: 'Recruitment Marketing', price: '$2,000/month' },
  ];

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const selectedService = services.find(s => s.id === data.serviceType);
      if (!selectedService) {
        throw new Error('Service not found');
      }

      await generatePDF({
        ...data,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
      });

      toast.success('PDF presentation generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF presentation');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">
              Sales Presentation Generator
            </CardTitle>
            <p className="text-gray-300 text-center">
              Create personalized PDF presentations for potential clients
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Service Selection */}
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Service/Product *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - {service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Contact Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="John Smith"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="john@company.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="+1 (555) 123-4567"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Company Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Company Inc."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="123 Main St"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="New York"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">State</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="NY"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="10001"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Date *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="personalMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Personal Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Add a personal message for the client..."
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating PDF...
                    </span>
                  ) : 'Generate PDF Presentation'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPresentationGenerator;
