import { categoryconfig, filterconfig } from "@/types/category";

 export const categoryConfig: categoryconfig = {
  "phone-booths": {
    title: "Phone Booths",
    label: "Focus Zone",
    capacity: "1 person",
    price_range: "From $2.50",
  },
  "hot-desks": {
    title: "Flexible Hot Desking",
    label: "Community",
    capacity: "1-6 people",
    price_range: "From $1.50"
  },
  "private-offices": {
    title: "Exclusive Private Offices",
    label: "Privacy",
    capacity: "1-15 people",
    price_range: "From $30.00"
  },
  "meeting-rooms": {
    title: "Meeting & Boardrooms",
    label: "Collaboration",
    capacity: "5-15 people",
    price_range: "From $80.00"
  }
 };
export const filterConfig:filterconfig = {

"hot-desks":{

filters:[
"All",
"Solo",
"Duo",
"Teams"
],

filterKey:"workspace_type"

},

"private-offices":{

filters:[
"All",
"Executive Wing",
"Deluxe Wing"
],

filterKey:"location_label"

},

"phone-booths":{

filters:null,
filterKey: null

},

"meeting-rooms":{

filters:null,
filterKey:null

}

}
