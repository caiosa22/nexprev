
import type React from 'react';

export interface ActionItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tag?: {
    text: string;
    color: string;
  };
}

export interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  labelLine1: string;
  labelLine2: string;
  tag?: {
    text: string;
    color: string;
  };
}

export interface Offer {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
}

export interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active: boolean;
}

export interface Merchant {
    id: string;
    name: string;
    email: string;
    phone: string;
    businessName: string;
    cnpj: string;
    address: string;
    category: string;
    description: string;
    logoUrl?: string;
    isActive: boolean;
    createdAt: string;
}

export interface Product {
    id: string;
    merchantId: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    isActive: boolean;
    stock: number;
    createdAt: string;
}

export interface MerchantOffer {
    id: string;
    merchantId: string;
    productId?: string;
    title: string;
    description: string;
    discountPercentage?: number;
    discountAmount?: number;
    minPurchaseAmount?: number;
    maxDiscountAmount?: number;
    validFrom: string;
    validUntil: string;
    isActive: boolean;
    imageUrl?: string;
    createdAt: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalPurchases: number;
    lastPurchase: string;
    cashbackEarned: number;
    isActive: boolean;
}
