function main() {
  // Base URL
  const baseUrl = "https://web-server-book-dicoding.appspot.com";

  // refactor using fetch
  const getBook = () => {
    fetch(`${baseUrl}/list`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllBooks(responseJson.books);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  //   versi async await
  //   const getBook = () => {
  //     fetch(`${baseUrl}/list`)
  //      .then(response => {
  //          return response.json();
  //      })
  //      .then(responseJson => {
  //         if(responseJson.error) {
  //             showResponseMessage(responseJson.message);
  //         } else {
  //             renderAllBooks(responseJson.books);
  //         }
  //      })
  //      .catch(error => {
  //          showResponseMessage(error);
  //      })
  // };

  // refactor using fetch
  const insertBook = (book) => {
    fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getBook();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  //   versi async await
  //   const insertBook = async (book) => {
  //     try{
  //         const options = {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "X-Auth-Token": "12345"
  //             },
  //             body: JSON.stringify(book)
  //         }

  //         const response = await fetch(`${baseUrl}/add`, options)
  //         const responseJson = await response.json();
  //         showResponseMessage(responseJson.message);
  //         getBook();
  //     } catch(error) {
  //         showResponseMessage(error)
  //     }
  // }

  // refactor using fetch
  const updateBook = (book) => {
    fetch(`${baseUrl}/edit/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getBook();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  // async await version
  //   const updateBook = async (book) => {
  //     try {
  //         const options = {
  //             method: "PUT",
  //             headers: {
  //                "Content-Type": "application/json",
  //                 "X-Auth-Token": "12345"
  //            },
  //            body: JSON.stringify(book)
  //         }

  //         const response = await fetch(`${baseUrl}/edit/${book.id}`, options);
  //         const responseJson = await response.json();

  //         showResponseMessage(responseJson.message);
  //         getBook();
  //    } catch(error) {
  //         showResponseMessage(error);
  //    }
  // };

  // refactor using fetch
  const removeBook = (bookId) => {
    fetch(`${baseUrl}/delete/${bookId}`, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": "12345",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getBook();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  /*
        jangan ubah kode di bawah ini ya!
    */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector("#listBook");
    listBookElement.innerHTML = "";

    books.forEach((book) => {
      listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
    });

    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const bookId = event.target.id;
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const inputBookId = document.querySelector("#inputBookId");
    const inputBookTitle = document.querySelector("#inputBookTitle");
    const inputBookAuthor = document.querySelector("#inputBookAuthor");
    const buttonSave = document.querySelector("#buttonSave");
    const buttonUpdate = document.querySelector("#buttonUpdate");

    buttonSave.addEventListener("click", function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };
      insertBook(book);
    });

    buttonUpdate.addEventListener("click", function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;
