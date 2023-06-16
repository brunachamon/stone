import { Formik } from "formik";

const ProductForm = ({ isEditting = false, product = {}, onSubmit }) => (
  <Formik
    initialValues={product}
    validate={(values) => {
      const errors = {};

      if (!values.price || values.price <= 0) {
        errors.price = "O preço do produto precisa ser maior que zero.";
      }
      if (!values.name) {
        errors.name = "O nome do produto não pode ser vázio.";
      }
      if (!values.category) {
        errors.category = "A categoria do produto não pode ser vázia.";
      }
      if (!values.description) {
        errors.description = "A descrição do produto não pode ser vázia.";
      }
      if (!values.image) {
        errors.image = "A URL da imagem do produto não pode ser vázia.";
      }

      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(">>>>>>>> values", values);

      try {
        setSubmitting(true);

        onSubmit?.(values);
      } finally {
        setSubmitting(false);
      }
    }}
  >
    {({
      values,
      errors,
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
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>

                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.name && (
                    <span className="text-red-400">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descrição
                  </label>

                  <textarea
                    type="text"
                    name="description"
                    rows="5"
                    cols="40"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.description && (
                    <span className="text-red-400">{errors.description}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Preço
                  </label>

                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.price && (
                    <span className="text-red-400">{errors.price}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Categoria
                  </label>

                  <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.category && (
                    <span className="text-red-400">{errors.category}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Url da imagem
                  </label>

                  <input
                    type="text"
                    name="image"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.image && (
                    <span className="text-red-400">{errors.image}</span>
                  )}
                </div>

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
