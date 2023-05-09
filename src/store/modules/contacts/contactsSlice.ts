// Adapter -> was contains all the logic of the search in the store
// never exists equals id in the database

/* 
{
  id: ['john@gmail.com', 'doe@gmail.com'],
  entities: {
    ['john@gmail.com']: {
      LOGIC
    },
    ['doe@gmail.com']: {
      
    }
  }
}
*/

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Contact } from "../../../types/contact";

const contactsAdapter = createEntityAdapter<Contact>({
  // Unique Property of array
  selectId: (contact) => contact.email,
});

export const { selectAll: selectAllContacts, selectById: selectContactByEmail } =
  contactsAdapter.getSelectors((state: RootState) => state.contacts);

export const contactsSlice = createSlice({
  name: "contacts",

  // Empty by default using a structure of adapter
  initialState: contactsAdapter.getInitialState(),
  
  // Select methods of the adapter
  reducers: {
    addOne: contactsAdapter.addOne,
    updateOne: contactsAdapter.updateOne,
    deleteOne: contactsAdapter.removeOne,
  },
});

export const { addOne, deleteOne, updateOne } = contactsSlice.actions;
export const selectContacts = (state: RootState) => state.contacts;
export default contactsSlice.reducer;
