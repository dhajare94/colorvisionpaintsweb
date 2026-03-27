import { CONFIG } from '../config';

export interface EnquiryData {
  name: string;
  mobile: string;
  email?: string;
  city: string;
  state: string;
  roleType: string;
  message: string;
  source: string;
  pageUrl: string;
  createdFrom: string;
  // Existing field for Contact page form
  productInterested?: string;
  // Product specific fields for ProductDetails modal
  productName?: string;
  productSlug?: string;
  quantity?: number;
  cartItems?: Array<{
    productName: string;
    productSlug: string;
    quantity: number;
  }>;
  // Geolocation
  latitude?: number | null;
  longitude?: number | null;
}

export const submitEnquiry = async (data: EnquiryData): Promise<void> => {
  const url = `${CONFIG.API_BASE_URL}/api/enquiries/create`;

  // Log the request clearly in development mode
  if (import.meta.env.DEV) {
    console.log('%c --- ERP Enquiry API Debug --- ', 'background: #222; color: #bada55');
    console.log('Final URL being called:', url);
    console.log('Data payload:', data);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to submit enquiry';
      try {
        // Try to parse JSON error message from backend
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // Fallback to text if not JSON
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
  } catch (err: any) {
    // Check if it's a network/connection error (ERR_CONNECTION_REFUSED)
    if (err instanceof TypeError || err.message === 'Failed to fetch') {
      throw new Error("Enquiry service is temporarily unavailable. Please try again.");
    }
    throw err;
  }
};
