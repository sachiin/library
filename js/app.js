(function($) {
var books = [{title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"s",coverImage: "img/placeholder.png"},
{title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"Coffe",coverImage: "img/placeholder.png"},
{title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"S",coverImage: "img/placeholder.png"},
{title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"N",coverImage: "img/placeholder.png"},
{title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaS",coverImage: "img/placeholder.png"}];

 var Book = Backbone.Model.extend({
   defaults:
   {
    title: "Some title",
	coverImage: "img/placeholder.png",
	author: "John Doe",
	releaseDate: "2013",
	keywords: "javascript"
   }
 });
 var BookView = Backbone.View.extend({
 tagName:"div",
 className:"bookContainer",
 template:$("#bookTemplate").html(),
 render:function () {
 var tmpl = _.template(this.template); //tmpl is a function that takes a JSON obj
 this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagNam
 return this;
 },
 events: {
 "click .delete":"deleteBook"
 },
 deleteBook:function () {
 //Delete model
 this.model.destroy();
 this.remove();
 }
 });

var Library = Backbone.Collection.extend({
model:Book
});
var LibraryView = Backbone.View.extend({
events:{
"click #add":"addBook"
},
el:$("#books"),
initialize:function(){
this.collection = new Library(books);
this.render();
this.collection.on("add", this.renderBook, this);
this.collection.on("remove", this.removeBook, this);

},
render:function(){
var that = this;
_.each(this.collection.models, function(item){
that.renderBook(item);
}, this);
},
addBook:function(e){
e.preventDefault();
var formData = {};
$("#addBook div").children("input").each(function(i, el){
console.log ($(el).val());
if ($(el).val() !== "") {
formData[el.id] = $(el).val();
}
});
books.push(formData);
this.collection.add(new Book(formData));
},
removeBook:function(removedBook){
var removedBookData = removedBook.attributes;
_.each(removedBookData, function(val, key){
if(removedBookData[key] === removedBook.defaults[key]){
delete removedBookData[key];
}
});
_.each(books, function(book){
if(_.isEqual(book, removedBookData)){
books.splice(_.indexOf(books, book), 1);
}

});

},
renderBook:function(item){
var bookView = new BookView({
model:item
});
this.$el.append(bookView.render().el);
}
});

var libraryView = new LibraryView();

})(jQuery);
