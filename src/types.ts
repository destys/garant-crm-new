"use strict";

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Order {
  id: number;
  attributes: {
    order_number: string;
    order_status: string;
    users_permissions_user: {
      data: {
        attributes: User;
      };
    };
    client: {
      data: Client;
    };
    correct_info: {
      model_code: string;
      brand: string;
      device: string;
      sold_date: string;
      sold_time: string;
      type_of_repair: string;
      kind_of_repair: string;
      diagnostics_date: string;
      deadline: string;
      date_issue: string;
      equipment: string;
      serial_number: string;
      model: string;
      defect: string;
      conclusion: string;
      estimation: string;
      work_done: string;
      prepayment: string;
    };
    device_photos: {
      data: FileInterface[];
    };
    order_files: {
      data: FileInterface[];
    };
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  last_name: string;
  balance: number;
  percent: number;
  middle_name: string | null;
  phone: string | null;
  role: UserRole;
}

export interface UserRole {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface Client {
  id: number;
  attributes: {
    name?: string;
    phone: string;
    address: string;
    orders: {
      data: Order[];
    };
  };
}

export interface FileInterface {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    url: string;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        url: string;
      };
    };
  };
}
