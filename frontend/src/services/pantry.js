import pantryitems from "@/Dummydata/pantryitems";

const pantryService = {
  async getitems() {
    return pantryitems;
  },
};



export default pantryService;
