class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr || {};
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            {
              title: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              category: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "price", "sort"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let output = {};
    let prop = "";

    for (let key in queryCopy) {
      if (key === "category" && queryCopy[key] === "all") {
        continue;
      }
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split("[")[0];

        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }
        output[prop][`$${operator}`] = Number(queryCopy[key]);
      }
    }
    this.query = this.query.find(output);
    return this;
  }

  sorting() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
