import {Roles} from "./roles";

export interface Users {
  uid: string;
  username: string;
  roles: Roles
  banned: boolean;
  currOrders: { [key: string]: [number, number, number] };
  prevOrders: [ { [key: string]: [number, number, number] } | null ];
  ratedDishes: string[];
  reviewedDishes: string[];
}
