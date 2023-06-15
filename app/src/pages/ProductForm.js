import { Formik } from "formik";

const ProductForm = ({ isEditting = false, product = {}, onSubmit }) => (
  <Formik
    initialValues={product}
    validate={(values) => {
      {
        /* name: String,
  description: String,
  price: Number,
  category: String,
  image: String,

   */
      }
      //   const errors = {};
      //   if (!values.email) {
      //     errors.email = "Required";
      //   } else if (
      //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      //   ) {
      //     errors.email = "Invalid email address";
      //   }
      //   return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      //   setTimeout(() => {
      //     alert(JSON.stringify(values, null, 2));
      //     setSubmitting(false);
      //   }, 400);
      onSubmit?.(values);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <section>
          <div className="flex flex-col items-center justify-center px-2 py-2 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  {isEditting
                    ? `Editando produto ${product._id}`
                    : "Cadastro de produto"}
                </h1>
                <div>
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.name && touched.name && errors.name}
                </div>

                {/* <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@gmail.com"
                    required=""
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div> */}

                <button
                  type="submit"
                  className="w-full text-white bg-sky-500/75 hover:bg-sky-500/50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isSubmitting}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    )}
  </Formik>
);

export default ProductForm;

{
  /* <input
          type="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && touched.name && errors.name}

        <input
          type="text"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />
        {errors.description && touched.description && errors.description}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
        />
        {errors.price && touched.price && errors.price}

        <input
          type="text"
          name="category"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.category}
        />
        {errors.category && touched.category && errors.category}

        <input
          type="url"
          name="image"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.image}
        />
        {errors.image && touched.image && errors.image}

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button> */
}
