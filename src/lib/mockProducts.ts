import { Product } from "@/types/design";

export const PRODUCTS: Product[] = [
  {
    id: "collar-atenea",
    name: "Collar Atenea",
    basePrice: 2400,
    material: "Oro 18k",
    variants: [
      { 
        id: "v1-gold", 
        colorName: "Oro", 
        colorHex: "#D4AF37", 
        sizes: ["U"], 
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCqNWyOt0egQGWJWkv6PCaEQqH3LLlkgSGNtQYOsMxII1uWuKFDIkY4zhTt-2K3s9daMBStUaapM0kOyJ3WrfFnBWt7O488PEVVfubb1sdlRdpD7cHVTBP-rp0mg2OILPXNnMO6pN3n_3BwMR4e-pW43oJyeGudVfuFNccxsfcprnhgs3jqvt2XsfT-ki7cj5mjZDCW6OCTCaqr64133vEVIH6MxLam9yraH-mvN_zQtcM-dSZqqKRGa4Q72617V0OluGJtddrUC7o",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD1desE0WVil3rOGQ_oVAys0BZOSXWv239zfsOd2gldG2m3OXdSW28q3gx3sQhSU3hJZwVMnkRIWfS62OME5jRcI5lO_f6KRWygihaGUE7ivrmzMpenAHNs9Yjzb7SIc5x8-3ej-O6CIE2ibn6J2S-Wwy5cbMH7Rwygy3emhg4fjXdOg7lwlniT5ryYd71mbOKWOeYlSQs1xvmHNOFopMhpEuJRPD8XA1W2c012yE0W-g02RUPN9slOWB3nhuHygVI_p64oU88QZk8"
        ] 
      },
      { 
        id: "v1-silver", 
        colorName: "Plata Esterlina", 
        colorHex: "#C0C0C0", 
        sizes: ["U"], 
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDw77XnLq8aL2M6C8M1l3m2l1O2D1rD0a2XkZk_R5l7_r3L339HqjQ9sL6l-EwD1xZ9N4o1r3D5Q0E_-T8C5Z2bM8P2A3xX1gZ8L7hG5jL2P2C3Q9T4wR8H9uXz-X-M_N-J1aH2_zYnZ9_9bJ3cR1nK4P-C8Z8wZ9_9lJwX1N8R_D3jZ8V-z",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCQbFnAEvba5YfRctK9_ofdy-hlELyK4KdgJ8ZIjoKnKf4VQj5XzvMg3PogsR6wl6fo1Sx985X0TjKjF05ZiLO9LPya0LRSWo_4oeyRePexho3nJHRBZPNmGW6T8n0iAedI9ZGAJNSShFdAs3Hs0enV1diFXrBpFV8-0uHEZzD-6j8ZA7Xrwzktqw9M09OjAhCwXbrAjuoxdeqFxKToJTVq9T3em3vP3AjJZwjhLZDt6hoP4IudBOYCtm2orwdmqi4B4vlUid80u1I"
        ] 
      }
    ]
  },
  {
    id: "anillo-hera",
    name: "Anillo Hera",
    basePrice: 1700,
    material: "Oro 18k",
    variants: [
      { id: "v2-gold", colorName: "Oro", colorHex: "#D4AF37", sizes: ["S", "M", "L"], images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD1desE0WVil3rOGQ_oVAys0BZOSXWv239zfsOd2gldG2m3OXdSW28q3gx3sQhSU3hJZwVMnkRIWfS62OME5jRcI5lO_f6KRWygihaGUE7ivrmzMpenAHNs9Yjzb7SIc5x8-3ej-O6CIE2ibn6J2S-Wwy5cbMH7Rwygy3emhg4fjXdOg7lwlniT5ryYd71mbOKWOeYlSQs1xvmHNOFopMhpEuJRPD8XA1W2c012yE0W-g02RUPN9slOWB3nhuHygVI_p64oU88QZk8"] }
    ]
  },
  {
    id: "pendientes-selene",
    name: "Pendientes Selene",
    basePrice: 1300,
    material: "Plata 925",
    variants: [
      { id: "v3-silver", colorName: "Plata", colorHex: "#C0C0C0", sizes: ["U"], images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCQbFnAEvba5YfRctK9_ofdy-hlELyK4KdgJ8ZIjoKnKf4VQj5XzvMg3PogsR6wl6fo1Sx985X0TjKjF05ZiLO9LPya0LRSWo_4oeyRePexho3nJHRBZPNmGW6T8n0iAedI9ZGAJNSShFdAs3Hs0enV1diFXrBpFV8-0uHEZzD-6j8ZA7Xrwzktqw9M09OjAhCwXbrAjuoxdeqFxKToJTVq9T3em3vP3AjJZwjhLZDt6hoP4IudBOYCtm2orwdmqi4B4vlUid80u1I"] }
    ]
  },
  {
    id: "brazalete-artemisa",
    name: "Brazalete Artemisa",
    basePrice: 3000,
    material: "Oro 18k",
    variants: [
      { id: "v4-gold", colorName: "Oro", colorHex: "#D4AF37", sizes: ["U"], images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAPUw5dDQXuMVzp5nLq4-BT2OwwYDpoVEbZKCdsogal44RtL_dwNVA1e5gg5Rw2UWkInSiqdlFF9zcLkJc3psVRvrde6wizMVoMDkUGUs8Z9nrIIyBLcg4yII0BTCX56W_B4Fi5CW9Di0d9kuvIlUyQrz1pWktj7r5kaF0dLjl9Ub7uEFm3F4Eo8s8i8KREWdCopmbyn510AEm7h82vyTQQU_QNpC2GhJUN508a6w7R7R6JVvP2_4atEbjclVRNQWxZI5OOdwVH4BY"] }
    ]
  },
  {
    id: "anillo-afrodita",
    name: "Anillo Afrodita",
    basePrice: 4200,
    material: "Plata 925",
    variants: [
      { id: "v5-white", colorName: "Blanco", colorHex: "#FFFFFF", sizes: ["M", "L"], images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD5YE_TjLJMVb818uV5rA2BF7kUqbh_7WB9xfrEJ8WxBa5dhz6xuCQSBXHQPKUgRi0UR_vIiDC6IPSaPFLz6kOq5eVhvcXBF-Je9Vbp7KPD17-GmZBfUiQwoqUVOqgnDhcaeqbv0LiOvvmweKnmeSOwcMmiEF9Q-hb991JsvOxe9usXlNaSPpVzXEu7Sa9yfwvUPqX6T_cSerhaIDe3Tj85iF-SmUvX_mVxtIBb_WdPvv3KF86ujyNg8G5x-8CvYPGXzwjI18j8whA"] }
    ]
  },
  {
    id: "collar-zeus",
    name: "Collar Zeus",
    basePrice: 3900,
    material: "Oro 18k",
    variants: [
      { id: "v6-gold", colorName: "Oro", colorHex: "#D4AF37", sizes: ["U"], images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBwWqOk6l9BFDT86PkDwG6uCvyQ0f8rkt5xFvSAdjbPNYhv06y2BJBi5zBUXdOFUj8QFJTZea0q-Nc7_AHa9GtAUJ76YrRBSY-bx2i2zkNkLXge0iuojPq0_ECwTvvd1pOQl8BYVuMLD0OUfZ69aYcdP4kJ-s3M2zKD85BoLTVmhOecy3AZ26t-Us6Y6RnY0_zeoObwAz8Ti3AxkHBBe6wdij97BXTBnGywhMur0hGJxDA1JvXpWeTDpj2Svd-d8qIjmLJTf8Kdcdc"] }
    ]
  },
  {
    id: "collar-aurora",
    name: `Collar Aurora`,
    basePrice: 1200,
    isNew: true,
    material: "Oro 18k",
    variants: [
      { 
        id: "c1-gold", 
        colorName: "Oro", 
        colorHex: "#D4AF37", 
        sizes: ["U"], 
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAoQbE-NiK3NdozrHecRfBXDanK-zt9nK4tarlhrloerbfIcUaKnR1Dp2tMw-le070WIvo389iZqYwwyFxEMV4-A2_zteOdbmFBguvVZO8jQBqTXhx1TDzd37UTtzYqXGva0L3HFl1RiWadvn4axQrE7mj7VpwVMzUAWlUwDKdVvrE4pouV2vCgzVut1a1GiciTuK-_JkefNqWZDbmtnetcU3lpgJsSQdcRXXq7nW6NyRhMntXyh93m4VKhAVyQXXQ025dmQbSycxI",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB3n4-EULcrQinUkrXUuSaIoBuHG-QHfFkTrDOLkhUbTVfs8aUyEFJpbZDALqhi2-ZJdANMwEMIWrA2aQaxZVRCuDXHhHbi0IJ9lXUu_GPNbawsOD2lZaLISTKlPHK2WNS2xBr9r83j4uE8CIYgwXllQ9T5wmS37sFasNFYMF-W4hmd_HfyxBAu8gkHh6VQ0d-m-JMtfxpuXTc2_QVdMDI2D9sdBzrbLNUVfpOObEX21ySJvwF-aOauFY6JU9v0WxrqiwmNCcYDbEE"
        ] 
      },
      { 
        id: "c1-silver", 
        colorName: "Plata Esterlina", 
        colorHex: "#C0C0C0", 
        sizes: ["U"], 
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDZw7lrRkICH8r4RUemZP6ucjjNUispWQtefXq6jl7nNjBObybEVRBi0iJuSuOxuNyLm7YnxAXyUccB2VAKPA9TIRJSSO5xUt5RmBUPRVD3WFdWRFBoLQlFizladu23IfTWYFlcf1dcA-Ds0DUAVqmt9X5x5qn8l-XDv7CxsGYo6nlwA2gX_UGVwLi6o2hYKXDJJA1XRRg6GPcMgYP2GU9UVsHRgyvEiLG5_RaNkZ3WmDLw-UNLqYz0_ds_izsVRFbAoPZVijKYluk",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD-y7DoozDLH8zcqWtujOeeGBzLP1KqxdNZ9fV68AeO8Cx_helRwM1xxgE9wUp8L4dFQ3ZIfj4ahlxhAF3IPwGsDBkvdaGzhYHHzeEt8dsL-EtER3Leh4UCnL5Zk5k9nHb6ZAOZA_iK1ZD-yhOEm9Oo6aJuPu59PZeAQ4FOF0PW2aHnM871UUCr_29Nu4UG-wLYa1l6veczQ33BFbC7NxoG6Q6fBdHlhuYy8_naCyPDcBbnm-idSnOdgb1G7BvTe_CuOoKErDzWNBQ"
        ] 
      }
    ]
  },
  {
    id: "collar-luna",
    name: "Collar Luna",
    basePrice: 950,
    material: "Oro 18k",
    variants: [
      { id: "c2-gold", colorName: "Oro", colorHex: "#D4AF37", sizes: ["U"], images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDZw7lrRkICH8r4RUemZP6ucjjNUispWQtefXq6jl7nNjBObybEVRBi0iJuSuOxuNyLm7YnxAXyUccB2VAKPA9TIRJSSO5xUt5RmBUPRVD3WFdWRFBoLQlFizladu23IfTWYFlcf1dcA-Ds0DUAVqmt9X5x5qn8l-XDv7CxsGYo6nlwA2gX_UGVwLi6o2hYKXDJJA1XRRg6GPcMgYP2GU9UVsHRgyvEiLG5_RaNkZ3WmDLw-UNLqYz0_ds_izsVRFbAoPZVijKYluk"] }
    ]
  },
  {
    id: "gargantilla-radiante",
    name: "Gargantilla Radiante",
    basePrice: 1250,
    material: "Oro 18k",
    variants: [
      {
        id: "gv1-gold",
        colorName: "Oro",
        colorHex: "#D4AF37",
        sizes: ["U"],
        images: [
          "https://images.unsplash.com/photo-1599643478514-4a110186121f?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=800&auto=format&fit=crop"
        ],
      },
      {
        id: "gv2-silver",
        colorName: "Plata",
        colorHex: "#C0C0C0",
        sizes: ["U"],
        images: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
        ],
      }
    ],
  },
  {
      id: "anillo-sello-real",
      name: "Anillo Sello Real",
      basePrice: 890,
      material: "Plata 925",
      variants: [
        {
          id: "v3-gold",
          colorName: "Oro",
          colorHex: "#D4AF37",
          sizes: ["6", "7", "8"],
          images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b2540e?q=80&w=800&auto=format&fit=crop"
          ],
        }
      ],
  }
];
