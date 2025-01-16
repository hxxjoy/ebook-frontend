import BookCard from "./BookCard";

const FeaturedBooks = ({ books }) => {
    return (
      <section className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
          {books?.map(book => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    );
};

export default FeaturedBooks