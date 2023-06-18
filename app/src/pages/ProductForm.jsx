import { Formik } from "formik";

import ValidationMessages from "../utils/validationMessages";

function ProductForm({ isEditting = false, product = {}, onSubmit }) {
  return (
    <Formik
      initialValues={product}
      validate={(values) => {
        const errors = {};

        if (!values.price || values.price <= 0) {
          errors.price = ValidationMessages.price;
        }
        if (!values.name) {
          errors.name = ValidationMessages.name;
        }
        if (!values.category) {
          errors.category = ValidationMessages.category;
        }
        if (!values.description) {
          errors.description = ValidationMessages.description;
        }
        if (!values.image) {
          errors.image = ValidationMessages.image;
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
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
                      ? `Editando produto ${product.name}`
                      : "Cadastro de produto"}
                  </h1>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </label>

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
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        rows="5"
                        cols="40"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </label>

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
                      <input
                        id="price"
                        type="number"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </label>

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
                      <input
                        type="text"
                        id="category"
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </label>

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
                      <input
                        type="text"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.image}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </label>

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
}

export default ProductForm;
