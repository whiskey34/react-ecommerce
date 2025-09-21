import { create } from 'zustand';
// import { persist } from "zustand/middleware";

import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}



export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newItems = [...state.items, item];
      }
      // save AFTER state is updated
      saveCartToUser(newItems);
      return { items: newItems };
    });
  },

  updateQty: (id, quantity) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity < 1 ? 1 : quantity }
          : item
      );
      saveCartToUser(newItems);
      return { items: newItems };
    });
  },

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      saveCartToUser(newItems);
      return { items: newItems };
    }),

  clearCart: () => {
    set({ items: [] });
    saveCartToUser([]); // also clear on server
  },
}));

const saveCartToUser = async (items: CartItem[]) => {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, "carts", user.uid);
  await setDoc(ref, { items }, { merge: true });
};

export const loadCartForUser = async (uid: string) => {
  const ref = doc(db, "carts", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    useCartStore.setState({ items: snap.data().items || [] });
  }
};