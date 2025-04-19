
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { DollarSign, CreditCard, HandHeart } from "lucide-react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

// Mock data for the startup
const startupData = {
  id: "123",
  name: "EcoTech Solutions",
  tagline: "Sustainable energy for everyone",
  description: "EcoTech Solutions is developing innovative solar technology that's more affordable and accessible than traditional solutions. Our mission is to bring clean energy to underserved communities around the world.",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200",
  raised: 75000,
  goal: 150000,
  backers: 128
};

const SupportUs = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount("");
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("");
  };
  
  const getFinalAmount = () => {
    if (amount) return parseInt(amount);
    if (customAmount) return parseInt(customAmount);
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalAmount = getFinalAmount();
    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }
    
    if (!name || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you for your support!",
        description: `Your donation of $${finalAmount} to ${startupData.name} has been processed.`,
      });
      
      // Reset form
      setAmount("");
      setCustomAmount("");
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);
  };

  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((startupData.raised / startupData.goal) * 100), 100);

  return (
    <>
    <Navbar></Navbar>
    <MainLayout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img src={startupData.logo} alt={startupData.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{startupData.name}</h1>
                    <p className="text-gray-600">{startupData.tagline}</p>
                  </div>
                </div>
                
                <Card className="animate-fade-in shadow-sm">
                  <CardHeader>
                    <CardTitle>About This Startup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{startupData.description}</p>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700 font-medium">${startupData.raised.toLocaleString()} raised of ${startupData.goal.toLocaleString()}</span>
                            <span className="text-gray-700 font-medium">{progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-launchpad-blue h-2.5 rounded-full" 
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <div>
                            <span className="font-medium text-lg text-gray-900">{startupData.backers}</span> backers
                          </div>
                          <div>
                            <span className="font-medium text-lg text-gray-900">${Math.round(startupData.raised / startupData.backers).toLocaleString()}</span> avg. donation
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in shadow-sm">
                  <CardHeader>
                    <CardTitle>Support Our Vision</CardTitle>
                    <CardDescription>Your contribution helps us bring our innovation to market</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">How Your Support Helps</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="bg-launchpad-blue/10 text-launchpad-blue rounded-full p-1 mr-2 mt-0.5">
                              <HandHeart className="h-4 w-4" />
                            </span>
                            <span>Fund research and development of our solar technology</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-launchpad-blue/10 text-launchpad-blue rounded-full p-1 mr-2 mt-0.5">
                              <HandHeart className="h-4 w-4" />
                            </span>
                            <span>Support pilot projects in underserved communities</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-launchpad-blue/10 text-launchpad-blue rounded-full p-1 mr-2 mt-0.5">
                              <HandHeart className="h-4 w-4" />
                            </span>
                            <span>Help us scale production and reduce costs</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-launchpad-blue/10 text-launchpad-blue rounded-full p-1 mr-2 mt-0.5">
                              <HandHeart className="h-4 w-4" />
                            </span>
                            <span>Enable education and training programs</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700 mb-2 font-medium">Note from the founders:</p>
                        <p className="text-gray-600 italic">
                          "Every contribution, no matter the size, brings us one step closer to our goal of making clean energy accessible to everyone. Thank you for believing in our vision."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="animate-fade-in shadow-sm">
                  <CardHeader>
                    <CardTitle>Support Us</CardTitle>
                    <CardDescription>Choose an amount to contribute</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Select Amount</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {[25, 50, 100, 250, 500, 1000].map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant={amount === value.toString() ? "default" : "outline"}
                              className={`${amount === value.toString() ? "bg-launchpad-blue" : ""}`}
                              onClick={() => handleAmountSelect(value.toString())}
                            >
                              ${value}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="custom">Custom Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                          <Input
                            id="custom"
                            type="number"
                            min="1"
                            placeholder="Enter amount"
                            className="pl-8"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea 
                          id="message" 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Leave a message for the founders"
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
                          <TabsList className="grid grid-cols-2">
                            <TabsTrigger value="card">Credit Card</TabsTrigger>
                            <TabsTrigger value="paypal">PayPal</TabsTrigger>
                          </TabsList>
                          <TabsContent value="card" className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="paypal" className="pt-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-600 mb-2">You'll be redirected to PayPal to complete your donation.</p>
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-8 mx-auto" />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button 
                      onClick={handleSubmit}
                      className="w-full bg-launchpad-blue"
                      disabled={isSubmitting || (!amount && !customAmount) || !name || !email}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <HandHeart className="mr-2 h-5 w-5" />
                          Support with ${getFinalAmount() || 0}
                        </div>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Your contribution is not tax-deductible. By donating, you agree to our terms of service.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
    
    
    </>
   
  );
};

export default SupportUs;
