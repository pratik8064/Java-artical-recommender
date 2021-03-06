questions = [
    {
        "type":"answer",
        "text":"One way to implement deep copy is to add copy constructors to each associated class. A copy constructor takes an instance of 'this' as its single argument and copies all the values from it. Quite some work, but pretty straightforward and safe. EDIT: note that you don't need to use accessor methods to read fields. You can access all fields directly because the source instance is always of the same type as the instance with the copy constructor. Obvious but might be overlooked. Example: Edit: Note that when using copy constructors you need to know the runtime type of the object you are copying. With the above approach you cannot easily copy a mixed list (you might be able to do it with some reflection code). ",
        "code":"public class Order {private long number;public Order() {}/** * Copy constructor */public Order(Order source) {number = source.number;}}public class Customer {private String name;private List<Order> orders = new ArrayList<Order>();public Customer() {}/** * Copy constructor */public Customer(Customer source) {name = source.name;for (Order sourceOrder : source.orders) {orders.add(new Order(sourceOrder));}}public String getName() {return name;}public void setName(String name) {this.name = name;}}",
        "tokens": ['one', 'way', 'implement', 'deep', 'copy', 'add', 'copy', 'constructors', 'associated', 'class', 'copy', 'constructor', 'takes', 'instance', "'this", 'single', 'argument', 'copies', 'values', 'quite', 'work', 'pretty', 'straightforward', 'safe', 'edit', 'note', "n't", 'need', 'use', 'accessor', 'methods', 'read', 'fields', 'access', 'fields', 'directly', 'source', 'instance', 'always', 'type', 'instance', 'copy', 'constructor', 'obvious', 'might', 'overlooked', 'example', 'edit', 'note', 'using', 'copy', 'constructors', 'need', 'know', 'runtime', 'type', 'object', 'copying', 'approach', 'easily', 'copy', 'mixed', 'list', 'might', 'able', 'reflection', 'code']
    } ,
    {
        "type":"question",
        "text":"I was presented with this question in an end of module open book exam today and found myself lost. i was reading Head first Javaand both definitions seemed to be exactly the same. i was just wondering what the MAIN difference was for my own piece of mind. i know there are a number of similar questions to this but, none i have seen which provide a definitive answer.Thanks, Darren",
        "code":"",
        "tokens":['presented', 'question', 'end', 'module', 'open', 'book', 'exam', 'today', 'found', 'lost', 'reading', 'head', 'first', 'javaand', 'definitions', 'seemed', 'exactly', 'wondering', 'main', 'difference', 'piece', 'mind', 'know', 'number', 'similar', 'questions', 'none', 'seen', 'provide', 'definitive', 'answer.thanks', 'darren']

    },{
        "type":"answer accepted-answer",
        "text":"Inheritance is when a 'class' derives from an existing 'class'.So if you have a Person class, then you have a Student class that extends Person, Student inherits all the things that Person has.There are some details around the access modifiers you put on the fields/methods in Person, but that's the basic idea.For example, if you have a private field on Person, Student won't see it because its private, and private fields are not visible to subclasses.Polymorphism deals with how the program decides which methods it should use, depending on what type of thing it has.If you have a Person, which has a read method, and you have a Student which extends Person, which has its own implementation of read, which method gets called is determined for you by the runtime, depending if you have a Person or a Student.It gets a bit tricky, but if you do something likePerson p = new Student();p.read();the read method on Student gets called.Thats the polymorphism in action.You can do that assignment because a Student is a Person, but the runtime is smart enough to know that the actual type of p is Student.Note that details differ among languages.You can do inheritance in javascript for example, but its completely different than the way it works in Java.",
        "code":"",
        "tokens":['inheritance', 'class', 'derives', 'existing', 'class.so', 'person', 'class', 'student', 'class', 'extends', 'person', 'student', 'inherits', 'things', 'person', 'has.there', 'details', 'around', 'access', 'modifiers', 'put', 'fields/methods', 'person', "'s", 'basic', 'idea.for', 'example', 'private', 'field', 'person', 'student', 'wo', "n't", 'see', 'private', 'private', 'fields', 'visible', 'subclasses.polymorphism', 'deals', 'program', 'decides', 'methods', 'use', 'depending', 'type', 'thing', 'has.if', 'person', 'read', 'method', 'student', 'extends', 'person', 'implementation', 'read', 'method', 'gets', 'called', 'determined', 'runtime', 'depending', 'person', 'student.it', 'gets', 'bit', 'tricky', 'something', 'likeperson', 'p', 'new', 'student', 'p.read', 'read', 'method', 'student', 'gets', 'called.thats', 'polymorphism', 'action.you', 'assignment', 'student', 'person', 'runtime', 'smart', 'enough', 'know', 'actual', 'type', 'p', 'student.note', 'details', 'differ', 'among', 'languages.you', 'inheritance', 'javascript', 'example', 'completely', 'different', 'way', 'works', 'java']
    },{
        "type":"answer",
        "text":"Polymorphism: The ability to treat objects of different types in a similar manner.Example: Giraffe and Crocodile are both Animals, and animals can Move.If you have an instance of an Animal then you can call Move without knowing or caring what type of animal it is.Inheritance: This is one way of achieving both Polymorphism and code reuse at the same time.Other forms of polymorphism:There are other way of achieving polymorphism, such as interfaces, which provide only polymorphism but no code reuse (sometimes the code is quite different, such as Move for a Snake would be quite different from Move for a Dog, in which case an Interface would be the better polymorphic choice in this case.In other dynamic languages polymorphism can be achieved with Duck Typing, which is the classes don't even need to share the same base class or interface, they just need a method with the same name.Or even more dynamic like Javascript, you don't even need classes at all, just an object with the same method name can be used polymorphically.",
        "code":"",
        "tokens":['polymorphism', 'ability', 'treat', 'objects', 'different', 'types', 'similar', 'manner.example', 'giraffe', 'crocodile', 'animals', 'animals', 'move.if', 'instance', 'animal', 'call', 'move', 'without', 'knowing', 'caring', 'type', 'animal', 'is.inheritance', 'one', 'way', 'achieving', 'polymorphism', 'code', 'reuse', 'time.other', 'forms', 'polymorphism', 'way', 'achieving', 'polymorphism', 'interfaces', 'provide', 'polymorphism', 'code', 'reuse', 'sometimes', 'code', 'quite', 'different', 'move', 'snake', 'would', 'quite', 'different', 'move', 'dog', 'case', 'interface', 'would', 'better', 'polymorphic', 'choice', 'case.in', 'dynamic', 'languages', 'polymorphism', 'achieved', 'duck', 'typing', 'classes', "n't", 'even', 'need', 'share', 'base', 'class', 'interface', 'need', 'method', 'name.or', 'even', 'dynamic', 'like', 'javascript', "n't", 'even', 'need', 'classes', 'object', 'method', 'name', 'used', 'polymorphically']

    },{
        "type":"question",
        "text":"I found out that the above piece of code is perfectly legal in Java. I have the following questions. ThanksAdded one more question regarding Abstract method classes.",
        "code":"public class TestClass{public static void main(String[] args) {TestClass t = new TestClass();}private static void testMethod(){abstract class TestMethod{int a;int b;int c;abstract void implementMe();}class DummyClass extends TestMethod{void implementMe(){}}DummyClass dummy = new DummyClass();}}",
        "tokens":['found', 'piece', 'code', 'perfectly', 'legal', 'java', 'following', 'questions', 'thanksadded', 'one', 'question', 'regarding', 'abstract', 'method', 'classes']

    },{
        "type":"question",
        "text":"In java it's a bit difficult to implement a deep object copy function. What steps you take to ensure the original object and the cloned one share no reference? ",
        "code":"",
        "tokens":['java', "'s", 'bit', 'difficult', 'implement', 'deep', 'object', 'copy', 'function', 'steps', 'take', 'ensure', 'original', 'object', 'cloned', 'one', 'share', 'reference']

    },{
        "type":"answer",
        "text":"You can make a deep copy serialization without creating some files. Copy: Restore:",
        "code":"ByteArrayOutputStream bos = new ByteArrayOutputStream();ObjectOutputStream oos = new ObjectOutputStream(bos);oos.writeObject(object);oos.flush();oos.close();bos.close();byte[] byteData = bos.toByteArray();; ByteArrayInputStream bais = new ByteArrayInputStream(byteData);(Object) object = (Object) new ObjectInputStream(bais).readObject();",
        "tokens":['make', 'deep', 'copy', 'serialization', 'without', 'creating', 'files', 'copy', 'restore']
    },{
        "type":"answer",
        "text":"Java has the ability to create classes at runtime. These classes are known as Synthetic Classes or Dynamic Proxies. See for more information. Other open-source libraries, such as and also allow you to generate synthetic classes, and are more powerful than the libraries provided with the JRE. Synthetic classes are used by AOP (Aspect Oriented Programming) libraries such as Spring AOP and AspectJ, as well as ORM libraries such as Hibernate. ",
        "code":"",
        "tokens":['java', 'ability', 'create', 'classes', 'runtime', 'classes', 'known', 'synthetic', 'classes', 'dynamic', 'proxies', 'see', 'information', 'open-source', 'libraries', 'also', 'allow', 'generate', 'synthetic', 'classes', 'powerful', 'libraries', 'provided', 'jre', 'synthetic', 'classes', 'used', 'aop', 'aspect', 'oriented', 'programming', 'libraries', 'spring', 'aop', 'aspectj', 'well', 'orm', 'libraries', 'hibernate']

    },{
        "type":"answer",
        "text":"In short: the web server issues a unique identifier to on his visit. The visitor must bring back that ID for him to be recognised next time around. This identifier also allows the server to properly segregate objects owned by one session against that of another. If is: If is: Once he's on the service mode and on the groove, the servlet will work on the requests from all other clients.Why isn't it a good idea to have one instance per client? Think about this: Will you hire one pizza guy for every order that came? Do that and you'd be out of business in no time. It comes with a small risk though. Remember: this single guy holds all the order information in his pocket: so if you're not cautious about, he may end up giving the wrong order to a certain client.",
        "code":"",
        "tokens": ['short', 'web', 'server', 'issues', 'unique', 'identifier', 'visit', 'visitor', 'must', 'bring', 'back', 'id', 'recognised', 'next', 'time', 'around', 'identifier', 'also', 'allows', 'server', 'properly', 'segregate', 'objects', 'owned', 'one', 'session', 'another', "'s", 'service', 'mode', 'groove', 'servlet', 'work', 'requests', 'clients.why', "n't", 'good', 'idea', 'one', 'instance', 'per', 'client', 'think', 'hire', 'one', 'pizza', 'guy', 'every', 'order', 'came', "'d", 'business', 'time', 'comes', 'small', 'risk', 'though', 'remember', 'single', 'guy', 'holds', 'order', 'information', 'pocket', "'re", 'cautious', 'may', 'end', 'giving', 'wrong', 'order', 'certain', 'client']

    },{
        "type":"answer",
        "text":"A safe way is to serialize the object, then deserialize.This ensures everything is a brand new reference.about how to do this efficiently. Caveats: It's possible for classes to override serialization such that new instances are created, e.g. for singletons.Also this of course doesn't work if your classes aren't Serializable.",
        "code":"",
        "tokens":['safe', 'way', 'serialize', 'object', 'deserialize.this', 'ensures', 'everything', 'brand', 'new', 'reference.about', 'efficiently', 'caveats', "'s", 'possible', 'classes', 'override', 'serialization', 'new', 'instances', 'created', 'e.g', 'singletons.also', 'course', "n't", 'work', 'classes', "n't", 'serializable']

    }
];

let res = [];
for(let i = 0; i < questions.length; i++){
  //res.push(questions[i]["tokens"].join(" "));
  res.push(questions[i].text);
}

module.exports = res;